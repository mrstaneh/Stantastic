import 'dotenv/config'

import { handler } from './build/handler.js';
import helmet from "helmet";
import http from 'http';
import { createTerminus } from '@godaddy/terminus'

// Use helmet with other security headers, but disable CSP
const securityHeaders = helmet({
  contentSecurityPolicy: false
});

// Custom CSP that allows SvelteKit inline scripts
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://kit.fontawesome.com/ https://ka-f.fontawesome.com/",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com https://ka-f.fontawesome.com/",
  "connect-src 'self' https://ka-f.fontawesome.com/ https://formspree.io/",
  "img-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io/",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests"
].join('; ');

const server = http.createServer((req, res) => {
  securityHeaders(req, res, () => {
    res.setHeader('Content-Security-Policy', csp);
    handler(req, res);
  });
});

createTerminus(server, {
  signals: ['SIGTERM', 'SIGINT'],
  onSignal: async () => {
    // Call your cleanup functions below. For example:
    // db.shutdown()
  }
})

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

server.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});