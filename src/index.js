/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 */

// Export a default object containing event handlers
export default {
  // The fetch handler is invoked when this worker receives a HTTP(S) request
  // and should return a Response (optionally wrapped in a Promise)
  async fetch(request) {
    const url = new URL(request.url);
    const { pathname } = url;

    // If pathname start with /old-path, redirect to /new-path
    if (pathname.startsWith("/old-path")) {
      const newURL = url.toString().replace("/old-path", "/new-path");
      console.log(
        `Redirecting from ${url + pathname} to ${newURL + "/new-path"}`,
      );
      return new Response.redirect(newURL, 301); // 301 is HTTP status code for "Moved Permanently"
    }

    return new Response(
      `Hello, try visiting <a href="http://127.0.0.1:8787/old-path">http://127.0.0.1:8787/old-path</a>\n\n<hr />\n\n
      You will be redirected back to <a href="http://127.0.0.1:8787/new-path">http://127.0.0.1:8787/new-path</a>`,
      {
        headers: { "Content-Type": "text/html" },
      },
    );
  },
};
