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
async function handleRequest(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Modify this to your redirection logic
  if (pathname.startsWith('/old-path')) {
    const newURL = url.toString().replace('/old-path', '/new-path');
    return Response.redirect(newURL, 301);  // 301 is HTTP status code for "Moved Permanently"
  }

  return fetch(request);  // For other routes, proceed with the request as usual
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
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
your browser. You should be redirected to `http://127.0.0.1:8787/new-path`.

---

## 5. Deploy Your Project

Deploy your Worker using the following command:

```bash
npm run deploy
```

Your Worker will be live at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

---

## Conclusion

Great job on setting up a redirection Worker! With this setup, you can now easily redirect traffic to different paths or
even entirely different domains. Explore further by looking into more advanced redirection logic, handling query
parameters, or setting up conditional redirects based on user location, device type, etc. Ensure to check out
more [examples](https://developers.cloudflare.com/workers/examples) and dive deeper into advanced topics.