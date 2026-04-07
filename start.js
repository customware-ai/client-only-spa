import { createReadStream, existsSync } from "node:fs";
import { stat, readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_BUILD_DIR = path.join(__dirname, "build", "client");
const INDEX_HTML_PATH = path.join(CLIENT_BUILD_DIR, "index.html");
const DEFAULT_PORT = 8080;

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolveRequestPath(urlPathname) {
  const decodedPath = decodeURIComponent(urlPathname);
  const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.(\/|\\|$))+/, "");
  return path.join(CLIENT_BUILD_DIR, normalizedPath);
}

function sendFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const mimeType = MIME_TYPES[extension] ?? "application/octet-stream";

  response.writeHead(200, {
    "Content-Type": mimeType,
    "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
  });

  createReadStream(filePath).pipe(response);
}

async function serveSpaDocument(response) {
  const html = await readFile(INDEX_HTML_PATH);
  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-cache",
  });
  response.end(html);
}

async function handleRequest(request, response) {
  if (!existsSync(INDEX_HTML_PATH)) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Missing build/client/index.html. Run `npm run build` before `npm run start`.");
    return;
  }

  if (!request.url) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Missing request URL.");
    return;
  }

  const url = new URL(request.url, "http://127.0.0.1");

  // Keep a tiny explicit health route so sandbox orchestration can verify the
  // static server without depending on Vite preview behavior.
  if (url.pathname === "/health") {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("ok");
    return;
  }

  const filePath = resolveRequestPath(url.pathname);

  try {
    const fileStats = await stat(filePath);
    if (fileStats.isFile()) {
      sendFile(response, filePath);
      return;
    }
  } catch {}

  // Do not remove this fallback: template apps use client-side routing, so the
  // preview server must always return index.html for unknown document routes.
  await serveSpaDocument(response);
}

// Do not remove this file: sandbox preview/restart logic needs a stable Node
// localhost and fallback-port semantics.
const port = DEFAULT_PORT;
const server = createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Unexpected server error.");
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Static preview server running at http://0.0.0.0:${port}`);
});
