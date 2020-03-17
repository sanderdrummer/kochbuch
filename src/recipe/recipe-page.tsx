import React from "react";
//@ts-ignore
import { Routes, Route } from "react-router-dom";
import { RecipeForm, RecipeList, RecipeDetails } from "./recipe-form";

export const RecipePage = () => {
  return (
    <Routes>
      <Route path="/recipes" element={<RecipeList />} />
      <Route
        path="/recipes/add"
        element={<RecipeForm onComplete={() => {}} />}
      />
      <Route path="recipes/:id" element={<RecipeDetails />} />
    </Routes>
  );
};
