# LAB 2: Redirecting Traffic with Cloudflare Workers

## Setting up a Cloudflare Worker for Redirection

This guide will walk you through setting up a Cloudflare Worker that redirects traffic from one URL to another. This is
useful for routing users to different web pages based on certain conditions.

*NOTE: The repo contains a redirection worker project that you can clone. Alternatively, you can follow this guide to
set up `npm` and `wrangler` to create a new project on your own.*

---

## What is URL Redirection?

URL redirection, also called URL forwarding, is a technique for making a web page available under more than one URL
address. This is particularly useful in numerous scenarios such as routing users to the latest version of a website,
redirecting them to a regional server, or enforcing HTTPS.

---

## Get Started in the Dashboard

If you prefer using a UI:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Navigate to **Workers & Pages > Create application**.
3. Select **Create Worker > Deploy**.

---

## Prerequisites

Ensure you have:

- A [Cloudflare account](https://dash.cloudflare.com/sign-up).
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm) installed.

*If you haven't set up the environment, refer to Lab 1 for the setup instructions.*

---

## 1. Create a New Worker Project

If you are setting up a new project, use the following command:

```bash
npm create cloudflare@latest
```

Follow the prompts to name your Worker directory and choose where to create your application.

---

## 2. Develop with Wrangler Command Line Interface (CLI)

Navigate to your project directory and start developing with the following command:

```bash
npm run dev
```

This command will spin up a **local** server. Your worker will be available at `http://127.0.0.1:8787`, and code changes
will automatically rebuild your project.

---

## 3. Write Redirection Code

Modify the `src/index.js` file in your project to contain the following code for a basic redirection Worker:

```javascript
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
```

In this code snippet:

- We create a `handleRequest` function which gets triggered on fetching a request.
- We examine the URL path to check if it starts with `/old-path`.
- If it does, we replace `/old-path` with `/new-path` in the URL, and redirect the user with a 301 HTTP status code.
- Otherwise, we proceed with the request as usual.

Feel free to modify the code to suit your redirection logic.

---

## 4. Test Your Worker Locally

With `wrangler dev` running, you can now test your Worker locally by navigating to `http://127.0.0.1:8787/old-path` in
your browser. You should be redirected to this Github repository.

---

## 5. Deploy Your Project

Deploy your Worker using the following command:

```bash
npm run deploy
```

Your Worker will be live at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`. When you have the link, try
visiting `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/old-path` to see it working in action on Cloudflare.

---

## Conclusion

Great job on setting up a redirection Worker! With this setup, you can now easily redirect traffic to different paths or
even entirely different domains. Explore further by looking into more advanced redirection logic, handling query
parameters, or setting up conditional redirects based on user location, device type, etc. Ensure to check out
more [examples](https://developers.cloudflare.com/workers/examples) and dive deeper into advanced topics.