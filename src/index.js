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
    console.log("pathname", pathname);
    try {
      // If pathname start with /old-path, redirect to github repository
      if (pathname.startsWith("/old-path")) {
        // const newURL = url.toString().replace("/old-path", "/new-path");
        const newURL = "https://github.com/AdaptureAcademy/WorkerLab2";
        return Response.redirect(newURL, 301); // 301 is HTTP status code for "Moved Permanently"
      } else {
        const cleanURL = url.toString().replace("/new-path", "");

        return new Response(
          `Hello, try visiting <a href="${cleanURL}old-path" target='_blank'><b>this link</b></a>\n\n<hr />\n\n
      You will be redirected to <a href="https://github.com/AdaptureAcademy/WorkerLab2">https://github.com/AdaptureAcademy/WorkerLab2</a>`,
          {
            headers: { "Content-Type": "text/html" },
            status: 200,
          },
        );
      }
    } catch (e) {
      // If anything goes wrong, return a Response with status 500
      return new Response(e.message || e.toString(), { status: 500 });
    }
  },
};
