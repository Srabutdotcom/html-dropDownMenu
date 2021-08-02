import {
    Server,
    Router,
    Socket,
  } from "https://deno.land/x/http_wrapper@v0.5.0/mod.ts";

// Create a new route
const router = new Router();
// This endpoint will be accessible at /
router.get("/", async (req) => {
    // Respond using default methods
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html",
      }),
      body: await Deno.open("./demo.html"),
    });
  });

  // Create the server
const app = new Server();

// Add routes to server
app.use(router.routes);
// Add static assets folder
app.static("static", "/");

// Start the server
app
  .start({ port: 3000 })
  .then((config) => console.log(`Server running on localhost:${config.port}`));