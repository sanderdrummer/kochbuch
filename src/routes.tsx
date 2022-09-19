import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { ListPage } from "./list";

import { LIST_PATH, PLAN_PATH, BASE_PATH, RECIPE_PATH } from "./routes-config";
import { PlanView } from "./plan/plan";
import { RecipeList } from "./recipe/recipe-list";
import { Pane } from "./common/panes";
import {NavLink as Link} from "./common/link";
import {RecipeDetails} from "./recipe/recipe-details";

const BottomNav = () => {
  return (
    <div
      css={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <Pane
        css={{
          display: "grid",
          gridGap: "1rem",
          gridAutoFlow: "column",
          justifyItems: 'center'
        }}
      >
        <Link to={"/" + BASE_PATH + "/"}>Rezepte</Link>
        <Link to="plan">Plan</Link>
        <Link to="einkaufliste">Liste</Link>
      </Pane>
    </div>
  );
};

export const RootRoutes = () => {
  return (
      <Router>
        <Routes>
          <Route path={BASE_PATH}>
            <Route index element={<RecipeList />} />
            <Route path={':title'} element={<RecipeDetails />} />
            <Route path={LIST_PATH} element={<ListPage />} />
            <Route path={PLAN_PATH} element={<PlanView />} />
          </Route>
        </Routes>
        <BottomNav />
      </Router>
  );
};
