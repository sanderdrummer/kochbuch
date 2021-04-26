import React from "react";
import { render, screen } from "@testing-library/react";
import { RecipeList } from "../recipe-list";
import { server, rest } from "../../mockServer";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

describe("RecipeList", () => {
  it("loads and shows recipes", async () => {
    render(<RecipeList />);
    const loader = await screen.findByLabelText("loading");
    expect(loader).toBeVisible();

    const recipe = await screen.findByText("Bavette mit Zucchini Carbonara");
    expect(recipe).toBeVisible();
  });
  it.skip("handles server errors", async () => {
    server.use(
      rest.get(
        "https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json",
        (_, res, ctx) => {
          return res(ctx.status(400));
        }
      )
    );
    render(<RecipeList />);
    const errorScreen = await screen.findByText(
      "rezepte konnten nicht geladen werden"
    );
    expect(errorScreen).toBeVisible();
  });
});
