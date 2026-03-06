import 'dotenv/config'

import { handler } from './build/handler.js';
import express from 'express';
import helmet from "helmet";
import http from 'http';
import { createTerminus } from '@godaddy/terminus'

const app = express();

// Use helmet with other security headers, but disable CSP
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)

// Custom CSP middleware that allows SvelteKit inline scripts
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
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
    ].join('; ')
  );
  next();
});

app.use(handler);

const server = http.createServer(app)

createTerminus(server, {
  signals: ['SIGTERM', 'SIGINT'],
  onSignal: async () => {
    // Call your cleanup functions below. For example:
    // db.shutdown()
  }
})

server.listen(3000, () => {
  console.log('Listening on port 3000');
});