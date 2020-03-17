import React from "react";
//@ts-ignore
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";

import { OCR } from "./Ocr";
import { RecipePage } from "./recipe";

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>HI</Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/recipes">
            <RecipePage />
          </Route>
        </Routes>
      </Container>
      <Box m={4}>
        <Paper>
          <OCR />
        </Paper>
      </Box>
    </Router>
  );
}

export default App;
