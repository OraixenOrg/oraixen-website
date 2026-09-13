<?php
/**
 * Oraixen — contact form handler.
 *
 * Receives a POST from the website contact form (src/pages/Contact.tsx) and
 * emails it to the domain mailbox(es) configured below. It lives at the site
 * root (/contact.php) so the SPA .htaccess rewrite serves it directly — the
 * rewrite only redirects requests that are NOT real files, and this is one.
 *
 * Deployment note: this file is in public/ so Vite copies it verbatim into
 * dist/ on every build. It only runs on the live PHP host (cPanel/Apache);
 * `vite dev` does not execute PHP, so the form's fetch will 404 locally.
 *
 * Request flow:
 *   method check -> size check -> honeypot -> rate limit -> extract
 *   -> validate -> compose -> mail() -> JSON result
 */

// ---- Config ---------------------------------------------------------------
// Primary recipients (the "To" line). Add more to send to several mailboxes
// at once, e.g. ['info@oraixen.com', 'support@oraixen.com'].
$RECIPIENTS = ['info@oraixen.com'];

// Carbon-copy recipients (the "Cc" line). Everyone here also gets the message,
// and each recipient can see they were CC'd. Leave empty ([]) for none.
$CC = [
    'george.salama@oraixen.com',
    'ahmed.saad@oraixen.com',
    'omar.henidi@oraixen.com',
];

// The envelope/From address. MUST be a real mailbox on this domain so the
// mail passes SPF/DKIM and is not flagged as spoofed.
$FROM_EMAIL = 'info@oraixen.com';
$FROM_NAME  = 'Oraixen Website';
$SITE_NAME  = 'Oraixen';

// ---- Security limits ------------------------------------------------------
// Largest request body we will look at. A genuine enquiry is a few KB.
$MAX_REQUEST_BYTES = 64 * 1024; // 64 KB

// Per-field ceilings, counted in characters (UTF-8 aware where mbstring exists).
$MAX_NAME_LENGTH     = 120;
$MAX_EMAIL_LENGTH    = 254;  // RFC 5321 maximum address length
$MAX_COMPANY_LENGTH  = 160;
$MAX_BUDGET_LENGTH   = 80;
$MAX_TIMELINE_LENGTH = 80;
$MAX_MESSAGE_LENGTH  = 5000;

// Sliding-window rate limit, per visitor, enforced server-side.
$RATE_LIMIT_MAX_ATTEMPTS   = 10;
$RATE_LIMIT_WINDOW_SECONDS = 600; // 10 minutes

// Rate-limit state lives in the system temp dir, never under the web root.
$RATE_LIMIT_FILE = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'oraixen-contact-rate-limit.json';

// Mixed into the IP hash so the stored keys are not a plain sha256 of an IPv4
// address (which is small enough to brute-force). Not a secret, just friction.
$RATE_LIMIT_SALT = 'oraixen-contact-form-v1';
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');

// Only accept POST.
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Reject oversized bodies before doing any real work. Nothing submitted is
// echoed back.
$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
if ($contentLength > $MAX_REQUEST_BYTES) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'error' => 'Request too large']);
    exit;
}

// Honeypot: a hidden field real users never see or fill. If it has a value,
// it's a bot — pretend success so it learns nothing. Deliberately checked
// before the rate limiter so obvious bots never consume a real visitor's slot.
if (!empty($_POST['company_website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

/**
 * Sliding-window rate limit for one hashed visitor key.
 *
 * Fails open on every storage problem: lead capture matters more than perfect
 * throttling, so an unreadable, unlockable or corrupt state file lets the
 * submission through rather than breaking the form for everyone.
 *
 * @return array{allowed: bool, retry_after: int}
 */
function rate_limit_hit(string $visitorKey, string $path, int $maxAttempts, int $windowSeconds): array
{
    $allow = ['allowed' => true, 'retry_after' => 0];

    // 'c+' = read/write, create if missing, do not truncate an existing file.
    $handle = @fopen($path, 'c+');
    if ($handle === false) {
        error_log('Oraixen contact: rate-limit store unavailable; allowing submission.');
        return $allow;
    }

    // Best effort: keep the state readable only by the web user on shared hosts.
    @chmod($path, 0600);

    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        error_log('Oraixen contact: rate-limit lock unavailable; allowing submission.');
        return $allow;
    }

    $result = $allow;

    try {
        $raw   = stream_get_contents($handle);
        $state = (is_string($raw) && $raw !== '') ? json_decode($raw, true) : [];
        // Malformed JSON is safely treated as empty state.
        if (!is_array($state)) {
            $state = [];
        }

        $now    = time();
        $cutoff = $now - $windowSeconds;

        // Drop expired timestamps for every key, not just this visitor, so the
        // file cannot grow without bound.
        $pruned = [];
        foreach ($state as $key => $stamps) {
            if (!is_string($key) || !is_array($stamps)) {
                continue;
            }
            $kept = [];
            foreach ($stamps as $stamp) {
                if (is_int($stamp) && $stamp > $cutoff) {
                    $kept[] = $stamp;
                }
            }
            if ($kept) {
                $pruned[$key] = $kept;
            }
        }

        $attempts = isset($pruned[$visitorKey]) ? $pruned[$visitorKey] : [];

        if (count($attempts) >= $maxAttempts) {
            // Already at the limit: report when the oldest attempt ages out.
            $retryAfter = (min($attempts) + $windowSeconds) - $now;
            $result = ['allowed' => false, 'retry_after' => $retryAfter > 0 ? $retryAfter : 1];
        } else {
            $attempts[] = $now;
            $pruned[$visitorKey] = $attempts;
        }

        $encoded = json_encode($pruned);
        if ($encoded !== false) {
            ftruncate($handle, 0);
            rewind($handle);
            fwrite($handle, $encoded);
            fflush($handle);
        }
    } catch (Throwable $e) {
        // Never expose the reason to the browser, and never log PII.
        error_log('Oraixen contact: rate-limit check failed; allowing submission.');
        $result = $allow;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }

    return $result;
}

// Only REMOTE_ADDR is trusted. Proxy headers (X-Forwarded-For, X-Real-IP,
// CF-Connecting-IP) are attacker-controlled unless the proxy chain is formally
// configured, which it is not here. No address is ever stored: the key is a
// salted hash, so the state file holds no PII.
$remoteAddr = isset($_SERVER['REMOTE_ADDR']) && is_string($_SERVER['REMOTE_ADDR'])
    ? $_SERVER['REMOTE_ADDR']
    : '';

if ($remoteAddr !== '' && filter_var($remoteAddr, FILTER_VALIDATE_IP)) {
    $visitorKey = hash('sha256', $RATE_LIMIT_SALT . '|' . $remoteAddr);
    $rateLimit  = rate_limit_hit($visitorKey, $RATE_LIMIT_FILE, $RATE_LIMIT_MAX_ATTEMPTS, $RATE_LIMIT_WINDOW_SECONDS);

    if (!$rateLimit['allowed']) {
        http_response_code(429);
        header('Retry-After: ' . $rateLimit['retry_after']);
        echo json_encode(['ok' => false, 'error' => 'Too many requests']);
        exit;
    }
}
// No usable address: fail open rather than blocking every visitor.

/**
 * Reads one POST field. Only scalar strings are accepted, so a crafted
 * `name[]=foo` yields '' instead of an "Array to string conversion" warning
 * or the literal text "Array".
 */
function field(string $key): string
{
    if (!isset($_POST[$key]) || !is_string($_POST[$key])) {
        return '';
    }

    return trim($_POST[$key]);
}

/**
 * Character count. Prefers mbstring, then iconv; if neither extension is
 * present on the host the final fallback counts bytes, which for multi-byte
 * UTF-8 input over-counts and so enforces the limits conservatively.
 */
function text_length(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value, 'UTF-8');
    }

    if (function_exists('iconv_strlen')) {
        $length = iconv_strlen($value, 'UTF-8');
        if ($length !== false) {
            return $length;
        }
    }

    return strlen($value);
}

$name     = field('name');
$email    = field('email');
$company  = field('company');
$budget   = field('budget');
$timeline = field('timeline');
$message  = field('message');

// Validate required fields.
$errors = [];
if ($name === '')    { $errors[] = 'name'; }
if ($message === '') { $errors[] = 'message'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = 'email'; }

// Enforce per-field length ceilings.
$lengthLimits = [
    'name'     => [$name,     $MAX_NAME_LENGTH],
    'email'    => [$email,    $MAX_EMAIL_LENGTH],
    'company'  => [$company,  $MAX_COMPANY_LENGTH],
    'budget'   => [$budget,   $MAX_BUDGET_LENGTH],
    'timeline' => [$timeline, $MAX_TIMELINE_LENGTH],
    'message'  => [$message,  $MAX_MESSAGE_LENGTH],
];
foreach ($lengthLimits as $key => $limit) {
    if (text_length($limit[0]) > $limit[1] && !in_array($key, $errors, true)) {
        $errors[] = $key;
    }
}

// Only field names are returned — never the submitted values.
if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid fields', 'fields' => $errors]);
    exit;
}

// Strip CR/LF from anything that goes into mail headers (header injection).
function header_safe(string $v): string
{
    return str_replace(["\r", "\n"], ' ', $v);
}
$safeName  = header_safe($name);
$safeEmail = header_safe($email);

// Build the plain-text body (UTF-8 so Arabic submissions render correctly).
$lines = [];
$lines[] = "New contact form submission — {$SITE_NAME}";
$lines[] = str_repeat('-', 48);
$lines[] = "Name:     {$name}";
$lines[] = "Email:    {$email}";
if ($company !== '')  { $lines[] = "Company:  {$company}"; }
if ($budget !== '')   { $lines[] = "Budget:   {$budget}"; }
if ($timeline !== '') { $lines[] = "Timeline: {$timeline}"; }
$lines[] = '';
$lines[] = 'Message:';
$lines[] = $message;
$body = implode("\r\n", $lines);

// Encode the subject so non-ASCII names don't break it.
$subject        = "New inquiry from {$safeName} — {$SITE_NAME} website";
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = "From: {$FROM_NAME} <{$FROM_EMAIL}>";
$headers[] = "Reply-To: {$safeName} <{$safeEmail}>";
if ($CC) {
    $headers[] = 'Cc: ' . implode(', ', $CC);
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

$to = implode(', ', $RECIPIENTS);
$ok = mail($to, $encodedSubject, $body, implode("\r\n", $headers), "-f{$FROM_EMAIL}");

if (!$ok) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Send failed']);
    exit;
}

echo json_encode(['ok' => true]);
