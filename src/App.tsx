import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
  //@ts-ignore
} from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  createStyles,
  Theme,
  AppBar,
  Box
} from "@material-ui/core";

import { RecipePage } from "./recipe";
import { ListPage } from "./list";
import { FormatListBulleted, MenuBook, Settings } from "@material-ui/icons";

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
  const navigate = useNavigate();
  const styles = useStyles();
  const [value, setValue] = React.useState("recipes");

  React.useEffect(() => {
    navigate(`/${value}`);
  }, [navigate, value]);

  return (
    <AppBar position="fixed" color="primary" className={styles.nav}>
      <BottomNavigation value={value} showLabels>
        <BottomNavigationAction
          onClick={() => setValue("recipes")}
          value="recipes"
          label="Rezepte"
          icon={<FormatListBulleted />}
        />
        <BottomNavigationAction
          onClick={() => setValue("list")}
          value="list"
          label="Liste"
          icon={<MenuBook />}
        />
        <BottomNavigationAction
          onClick={() => setValue("settings")}
          value="settings"
          label="Einstellungen"
          icon={<Settings />}
        />
      </BottomNavigation>
    </AppBar>
  );
};

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container>
          <Box mt={2} mb={8}>
            <Routes>
              <Route path="/recipes/*" element={<RecipePage />}></Route>
              <Route path="/list/*" element={<ListPage />}></Route>
            </Routes>
          </Box>
        </Container>
        <BottomNav />
      </Router>
    </ThemeProvider>
  );
}

export default App;
