import { Elysia } from "elysia";

const plugin = (app: Elysia) =>
  app.state("plugin-version", 1).get("/from-plugin", () => "Hi from plugin!");

type Prefix = string;

const plugin2 = ({ prefix = "/v1" }: { prefix: Prefix }) =>
  new Elysia({ prefix }).get(`/hi`, () => "Hi");

const app = new Elysia()
  .state("version", 1)
  .decorate("getDate", () => Date.now())
  .derive(({ request: { headers } }) => {
    return {
      authorization: headers.get("Authorization"),
    };
  })
  .get(
    "/",
    ({ getDate, store: { version }, authorization }) =>
      `version: ${version} - date: ${getDate()} - auth: ${authorization}`
  )
  .post("/search", ({ query }) => query)
  .use(plugin)
  .use(
    plugin2({
      prefix: "",
    })
  );
app.listen(8080);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
