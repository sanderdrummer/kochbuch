import { initRecipes } from "@kochbuch/recipes";
import { MainRouters } from "./Router";

export const App = () => {
  initRecipes();
  return (
      <MainRouters />
  );
};
