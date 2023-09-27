import type { Elysia } from "elysia";
import { t } from "elysia";
import type { PrismaClient } from "@prisma/client";
import { createUser, getAllUsers, getUser } from "./plugins";

// Get User
// Create User
// Update User Name
// Get All Users

export const user = ({ prisma, app }: { prisma: PrismaClient; app: Elysia }) =>
  app.group("/user", (app) =>
    app
      .get("/", () => "Nothing to see here 😎")
      // "/user/userId/:id"
      .use(getUser({ prisma, app }))
      // "/user/create"
      .use(createUser({ prisma, app }))
      // "/users/all"
      .use(getAllUsers({ prisma, app }))
  );
