import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { Container, Box } from "@material-ui/core";
import { RootRoutes } from "./routes";
import { queryClient } from "./recipe/recipe-resource";
import { QueryClientProvider } from "react-query";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#00acc1",
      },
      secondary: {
        main: "#00bfa5",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Container>
          <Box mt={2} mb={8}>
            <RootRoutes />
          </Box>
        </Container>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
