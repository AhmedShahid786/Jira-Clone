import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie"
import { zValidator } from "@hono/zod-validator"
import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";
import { loginSchema, signupSchema } from "../schemas";

//? Create a new instance for the Hono class, this instance will follow the hono blueprint to define routes for our app
const app = new Hono()
  //* Create a new route "/login" with a POST request, it will handle our appwrite login request
  .post("/login", zValidator("json", loginSchema), async (c) => {
    try {
      const { email, password } = c.req.valid("json");
      console.log("login email =>", email);
      console.log("login password =>", password);
      return c.json({ email, password });
    } catch (err) {
      return c.json({ error: "Login Failed", details: err }, 401);
    }
  })
  //* Create a new route "/signup" with a POST request, it will handle our appwrite signup request
  .post("/signup", zValidator("json", signupSchema), async (c) => {
    try {
      const { name, email, password } = c.req.valid("json");

      const { account } = await createAdminClient();
      const user = await account.create(ID.unique(), email, password, name);
      console.log("account created");
      const session = await account.createEmailPasswordSession(email, password);
      setCookie(c, "ahmed-jira-clone-session", session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
      });

      return c.json({ data: user });
    } catch (err) {
      return c.json({ error: "Signup Failed", details: err }, 400);
    }
  })
  //* Create a new route "/logout" with a POST request, it will delete the cookie which handles the user's session
  //* (cooki-name : "ahmed-jira-clone-session") we set earlier during login/signup request
  .post("/logout", async (c) => {
    try {
      deleteCookie(c, "ahmed-jira-clone-session");
      return c.json({ success: "Logout Successful" }, 200);
    } catch (err) {
      return c.json({ error: "Logout Failed" }, 401);
    }
  });


export default app