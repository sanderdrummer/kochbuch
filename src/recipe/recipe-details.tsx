import React from "react";

import { useParams, useHistory } from "react-router-dom";
import { MenuBook } from "@material-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Button,
  List,
  ListItem,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { LIST_PATH } from "../routes-config";
import { useRecipeByTitle } from "./recipe-resource";
import { addListItems } from "../list/list-hooks";

export const RecipeDetails: React.FC = () => {
  const navigate = useHistory();
  const { id } = useParams<{ id: string }>();
  const title = decodeURIComponent(id || "");
  const recipe = useRecipeByTitle(title);

  if (!recipe) {
    return <Skeleton height="12rem" />;
  }

  return (
    <Box mt={3}>
      <Card>
        <CardHeader
          title={recipe.title}
          action={
            <Button
              startIcon={<MenuBook />}
              onClick={async () => {
                addListItems(
                  recipe.ingredients.map(
                    ({ amount, name }) => `${amount} ${name}`
                  )
                );
                navigate.push(LIST_PATH);
              }}
            >
              zur Einkaufsliste
            </Button>
          }
        ></CardHeader>
      </Card>

      <Box mt={3}>
        <Card>
          <CardHeader subheader="Zutaten"></CardHeader>
          <List>
            {recipe.ingredients.map((ingredient) => (
              <ListItem key={ingredient.name}>
                {ingredient.amount} {ingredient.name}
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>
      <Box mt={3}>
        <Card>
          <CardHeader subheader="Zubereitung"></CardHeader>
          <CardContent>
            <Typography style={{ whiteSpace: "pre-wrap" }}>
              {recipe.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
