import React from "react";
import { render, screen } from "@testing-library/react";
import { RecipeList } from "../recipe-list";
import { server, rest } from "../../mockServer";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../recipe-resource";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});

describe("RecipeList", () => {
  it("loads and shows recipes", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RecipeList />
      </QueryClientProvider>
    );
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
    render(
      <QueryClientProvider client={queryClient}>
        <RecipeList />
      </QueryClientProvider>
    );
    const errorScreen = await screen.findByText(
      "rezepte konnten nicht geladen werden"
    );
    expect(errorScreen).toBeVisible();
  });
});
