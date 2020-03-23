import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";

import { RecipePage } from "./recipe";
import { ListPage } from "./list";
import { SettingsPage } from "./settings";

import { FormatListBulleted, MenuBook, Settings } from "@material-ui/icons";
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";
import { RECIPES_PATH, LIST_PATH, SETTINGS_PATH } from "./routes-config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nav: {
      marginTop: theme.spacing(8),
      bottom: 0,
      top: "auto"
    }
  })
);

const BottomNav = () => {
  const navigate = useHistory();
  const styles = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, _2, value] = navigate.location.pathname.split("/");

  return (
    <AppBar position="fixed" color="primary" className={styles.nav}>
      <BottomNavigation value={value} showLabels>
        <BottomNavigationAction
          onClick={() => navigate.push(RECIPES_PATH)}
          value="rezepte"
          label="Rezepte"
          icon={<FormatListBulleted />}
        />
        <BottomNavigationAction
          onClick={() => navigate.push(LIST_PATH)}
          value="einkaufliste"
          label="Liste"
          icon={<MenuBook />}
        />
        <BottomNavigationAction
          onClick={() => navigate.push(SETTINGS_PATH)}
          value="einstellungen"
          label="Einstellungen"
          icon={<Settings />}
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
        <Route path={SETTINGS_PATH} component={SettingsPage} />
        <Redirect from="/" to={RECIPES_PATH} />
      </Switch>
      <BottomNav />
    </Router>
  );
};
