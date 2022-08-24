import { Router, Route, Switch, useLocation, Redirect } from "wouter";

import { ListPage } from "./list";

import { RECIPES_PATH, LIST_PATH, PLAN_PATH } from "./routes-config";
import { PlanView } from "./plan/plan";
import { RecipeList } from "./recipe/recipe-list";
import { TextButton } from "./common/inputs";

const BottomNav = () => {
  const [location, navigate] = useLocation();
  console.log(location);

  return (
    <div
      css={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <div
        css={{
          background: "var(--headerBackground)",
          padding: "1rem",
          display: "grid",
          gridGap: "1rem",
          gridAutoFlow: "column",
        }}
      >
        <TextButton
          color={location === RECIPES_PATH ? "primary" : undefined}
          onClick={() => navigate(RECIPES_PATH)}
        >
          Rezepte
        </TextButton>
        <TextButton
          color={location === PLAN_PATH ? "primary" : undefined}
          onClick={() => navigate(PLAN_PATH)}
        >
          Plan
        </TextButton>
        <TextButton
          color={location === LIST_PATH ? "primary" : undefined}
          onClick={() => navigate(LIST_PATH)}
        >
          Liste
        </TextButton>
      </div>
    </div>
  );
};

export const RootRoutes = () => {
  return (
    <Router base="/kochbuch">
      <Switch>
        <Route path={RECIPES_PATH} component={RecipeList} />
        <Route path={LIST_PATH} component={ListPage} />
        <Route path={PLAN_PATH} component={PlanView} />
        <Redirect to={RECIPES_PATH} />
      </Switch>
      <BottomNav />
    </Router>
  );
};
