// import main from '../main'

import { join } from 'path'
import { readFileSync } from 'fs'

const readmeMarkdown = readFileSync(join(__dirname, '../README.md'), 'utf-8')

import { IncomingMessage, ServerResponse } from 'http';

// Vercel runtime augments ServerResponse with helper methods
interface VercelServerResponse extends ServerResponse {
  status(code: number): this;
  send(body: any): this;
  json(data: any): this;
}

export default function handler(request: IncomingMessage, response: VercelServerResponse) {
  if (request.method === 'GET' && request.url === '/') {
    // Serve the home page with README content
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('Cache-Control', 'public, s-maxage=1');
    return response.status(200).send(generateHomeHtml());
  }

  if (request.method === 'GET' && request.url?.split('/').length === 2) {
    response.setHeader('Cache-Control', 'public, s-maxage=1');
    return response.status(200).json({ name: 'John Doe' });
  }

  return response.status(404).send('Not Found');
}

function generateHomeHtml () {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HumanEdited</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <header>
          <h1>Welcome to HumanEdited</h1>
          <p>Your platform for human-edited content.</p>
        </header>
        <main>
          <article>${readmeMarkdown}</article>
        </main>
      </body>
    </html>
  `;
}

// export default main
