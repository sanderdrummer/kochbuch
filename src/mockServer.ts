import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";

import recipes from "./recipes.json";

export const server = setupServer(
  rest.get(
    "https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(recipes));
    }
  ),

  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "You must add request handler." })
    );
  })
);
export { rest };
