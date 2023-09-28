import type { PrismaClient } from "@prisma/client";
import type { Elysia } from "elysia";

import {
  createTestimony,
  getAllTestimonies,
  getLatestTestimonies,
  getTestimoniesByUserId,
  getTestimonyById,
} from "./plugins";

export const testimony = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia;
}) =>
  app.group("/testimony", (app) =>
    app
      // Generic route
      .get("/", () => "Nothing to see here 😎!")
      // "/testimony/:id" - Retrieve a testimony by id
      .use(getTestimonyById({ prisma, app }))
      // "/testimony/user/:id" -  Retrieve all testimonies of a given authorId
      .use(getTestimoniesByUserId({ prisma, app }))
      // "/testimony/all" - Retrieve all testimonies
      .use(getAllTestimonies({ prisma, app }))
      // "/testimony/latest" - Fetches the latest posted testimonies - optional pagination
      .use(getLatestTestimonies({ prisma, app }))
      // "/testimony/create" - Create a Testimony
      .use(createTestimony({ prisma, app }))
  );
