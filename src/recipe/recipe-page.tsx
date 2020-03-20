import React from "react";
//@ts-ignore
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  RecipeForm,
  RecipeList,
  RecipeDetails,
  RecipeEditForm
} from "./recipe-form";

export const RecipePage = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<RecipeList />} />
      <Route
        path="/add"
        element={
          <RecipeForm
            onComplete={recipe => {
              navigate("/recipes/" + recipe.title);
            }}
          />
        }
      />
      <Route path="/:id" element={<RecipeDetails />} />
      <Route path="/:id/edit" element={<RecipeEditForm />} />
    </Routes>
  );
};
