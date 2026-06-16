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
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');

// Only accept POST.
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot: a hidden field real users never see or fill. If it has a value,
// it's a bot — pretend success so it learns nothing.
if (!empty($_POST['company_website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function field(string $key): string
{
    return isset($_POST[$key]) ? trim((string) $_POST[$key]) : '';
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
