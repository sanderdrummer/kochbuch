import React from "react";

import { useHistory } from "react-router-dom";
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
  ListItemText,
  Divider,
  Grow,
} from "@material-ui/core";

import { LIST_PATH } from "../routes-config";
import { addListItems } from "../list/list-hooks";
import { Recipe } from "./recipe-resource";

export const RecipeDetails: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const navigate = useHistory();
  const [unfold, setUnfold] = React.useState(false);

  return (
    <>
      <ListItem
        selected={unfold}
        button
        onClick={() => setUnfold((unfold) => !unfold)}
        key={recipe.title}
      >
        <ListItemText primary={recipe.title} />
      </ListItem>
      <Divider />
      <Grow in={unfold} mountOnEnter unmountOnExit>
        <Box mt={3}>
          <Card>
            <CardHeader
              title={recipe?.title}
              action={
                <Button
                  startIcon={<MenuBook />}
                  onClick={async () => {
                    addListItems(
                      recipe?.ingredients.map(
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
                {recipe?.ingredients.map((ingredient) => (
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
                  {recipe?.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Grow>
    </>
  );
};
