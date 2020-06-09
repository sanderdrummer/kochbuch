import React from "react";
import { render, screen } from "@testing-library/react";
import { RecipeList } from "../recipe-list";
import { server, rest } from "../../mockServer";
import { RecipeProvider } from "../recipe-resource";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("RecipeList", () => {
  it("loads and shows recipes", async () => {
    render(
      <RecipeProvider>
        <RecipeList />
      </RecipeProvider>
    );
    const loader = await screen.findByLabelText("loading");
    expect(loader).toBeVisible();

    const recipe = await screen.findByText("Spargel Bruschetta");
    expect(recipe).toBeVisible();
  });
  it("handles server errors", async () => {
    server.use(
      rest.get("*/recipe", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(
      <RecipeProvider>
        <RecipeList />
      </RecipeProvider>
    );
    const errorScreen = await screen.findByText(
      "rezepte konnten nicht geladen werden"
    );
    expect(errorScreen).toBeVisible();
  });
});
