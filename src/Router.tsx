import {
  Router,
  hashIntegration,
  Routes,
} from "@solidjs/router";
import {
  RecipeNavTab,
  RecipePlanNavTab,
  RecipeRoutes,
} from "@kochbuch/recipes";
import { Navbar } from "@kochbuch/components";

const BottomTabs = () => {
  return (
    <Navbar>
      <RecipeNavTab />
      <RecipePlanNavTab />
    </Navbar>
  );
};

export const MainRouters = () => {
  return (
    <Router source={hashIntegration()}>
      <Routes>
        <RecipeRoutes />
      </Routes>
      <BottomTabs />
    </Router>
  );
};
