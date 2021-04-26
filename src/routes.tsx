import React from "react";

import { Router, Route, Switch, useLocation, Redirect } from "wouter";

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
import { RecipeList } from "./recipe/recipe-list";

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
  const styles = useStyles();
  const [location, navigate] = useLocation();

  return (
    <AppBar position="fixed" color="primary" className={styles.nav}>
      <BottomNavigation value={location} showLabels>
        <BottomNavigationAction
          onClick={() => navigate(RECIPES_PATH)}
          value={RECIPES_PATH}
          label="Rezepte"
          icon={<MenuBook />}
        />
        <BottomNavigationAction
          onClick={() => navigate(PLAN_PATH)}
          value={PLAN_PATH}
          label="Plan"
          icon={<PlaylistAddCheck />}
        />
        <BottomNavigationAction
          onClick={() => navigate(LIST_PATH)}
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
        <Route path={RECIPES_PATH} component={RecipeList} />
        <Route path={LIST_PATH} component={ListPage} />
        <Route path={PLAN_PATH} component={PlanView} />
        <Redirect to={RECIPES_PATH} />
      </Switch>
      <BottomNav />
    </Router>
  );
};
