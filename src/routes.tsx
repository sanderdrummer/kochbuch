import React from "react";

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";

import { RecipePage } from "./recipe";
import { ListPage } from "./list";

import { MenuBook, List, PlaylistAddCheck } from "@material-ui/icons";
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { RECIPES_PATH, LIST_PATH, PLAN_PATH } from "./routes-config";
import { PlanView } from "./plan/plan";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nav: {
      marginTop: theme.spacing(8),
      bottom: 0,
      top: "auto",
    },
  })
);

const BottomNav = () => {
  const navigate = useHistory();
  const styles = useStyles();
  const location = useLocation();

  return (
    <AppBar position="fixed" color="primary" className={styles.nav}>
      <BottomNavigation value={location.pathname} showLabels>
        <BottomNavigationAction
          onClick={() => navigate.push(RECIPES_PATH)}
          value={RECIPES_PATH}
          label="Rezepte"
          icon={<MenuBook />}
        />
        <BottomNavigationAction
          onClick={() => navigate.push(PLAN_PATH)}
          value={PLAN_PATH}
          label="Plan"
          icon={<PlaylistAddCheck />}
        />
        <BottomNavigationAction
          onClick={() => navigate.push(LIST_PATH)}
          value={LIST_PATH}
          label="Liste"
          icon={<List />}
        />
      </BottomNavigation>
    </AppBar>
  );
};

export const RootRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path={RECIPES_PATH} component={RecipePage} />
        <Route path={LIST_PATH} component={ListPage} />
        <Route path={PLAN_PATH} component={PlanView} />
        <Redirect from="/" to={RECIPES_PATH} />
      </Switch>
      <BottomNav />
    </Router>
  );
};
