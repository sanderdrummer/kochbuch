import React from "react";

import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
} from "@material-ui/core";

import { Recipe } from "./recipe-resource";

const getAmount = (amount: string, modifier = 1) => {
  if (modifier === 1) return amount;

  const [digit = 0] = amount.match(/[0-9.]+/g) ?? [];
  const [scale = ""] = amount.match(/[a-zA-Z]+/g) ?? [];
  return `${Number(digit) * modifier}${scale}`;
};

export const RecipeDetails: React.FC<{
  recipe: Recipe;
  action?: React.ReactNode;
}> = ({ recipe, action }) => {
  const [unfold, setUnfold] = React.useState(false);
  const [modifier, setModifier] = React.useState(1);

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
      {unfold && (
        <Box mt={3}>
          <Card>
            <CardHeader title={recipe?.title} action={action}></CardHeader>
          </Card>
          <>
            <Box mt={3}>
              <Card>
                <CardHeader
                  subheader="Zutaten"
                  action={
                    <TextField
                      type="number"
                      value={modifier}
                      inputProps={{
                        step: 0.25,
                      }}
                      onChange={(e) => setModifier(Number(e.target.value))}
                    />
                  }
                ></CardHeader>

                <List>
                  {recipe?.ingredients.map((ingredient) => (
                    <ListItem key={ingredient.name}>
                      {getAmount(ingredient.amount, modifier)} {ingredient.name}
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
          </>
        </Box>
      )}
    </>
  );
};
