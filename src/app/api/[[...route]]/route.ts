//? Import Hono, a lightweight web framework for handling HTTP requests
import { Hono } from "hono";
//? Import Vercel adapter for Hono to integrate with Vercel's serverless functions
import { handle } from "hono/vercel";
//? Import auth routes from the specified file path
import auth from "../../../features/auth/server/route";

//? Initialize the Hono app instance and set a base path for all routes under "/api"
const app = new Hono().basePath("/api");
//? Define a new route under "/api/auth" using the auth routes
const routes = app.route("/auth", auth);

//? Export GET and POST handler for the app, allowing Hono to manage the requests
export const GET = handle(app);
export const POST = handle(app)
//? Define the type of the application routes to enable type inference elsewhere in the app
export type AppType = typeof routes;
