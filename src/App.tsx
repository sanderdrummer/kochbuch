import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { Container, Box } from "@material-ui/core";
import { RootRoutes } from "./routes";

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

      <Container>
        <Box mt={2} mb={8}>
          <RootRoutes />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
