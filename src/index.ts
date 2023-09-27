import { Elysia } from "elysia";

// Get User
// Create User
// Update User Name

// Get Profile
// Create Profile

export const userGroup = (app: Elysia) =>
  app.get("/user/:id", ({ params: { id } }) => {});

const app = new Elysia().state("version", 1);

app.listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
