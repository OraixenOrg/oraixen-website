// Type declarations for Next.js server utilities
// Note: Install Next.js package for full functionality: npm install next
declare module 'next/server' {
  export class NextResponse extends Response {
    static json(body: any, init?: ResponseInit): NextResponse;
  }
}
