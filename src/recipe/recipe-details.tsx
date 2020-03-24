import React from "react";

import { useParams, useHistory } from "react-router-dom";
import { Edit } from "@material-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  CardContent,
  Button,
  CardActions
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { BottomRightFab } from "../common";
import { addListItems } from "../db";
import { useRecipeByTitle } from "./recipe-hooks";
import { getRecipeDetailEditPath } from ".";

import { LIST_PATH } from "../routes-config";

export const RecipeDetails: React.FC = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const title = decodeURIComponent(id || "");
  const { status } = useRecipeByTitle(title);

  if (status === "" || status === "pending") {
    return <Skeleton height="12rem" />;
  }

  if (status === "error") {
    return <Box>rezpete konnten nicht geladen werden</Box>;
  }

  return (
    <Box mt={3}>
      <Card>
        <CardHeader title={status.title} subheader={status.tags}></CardHeader>
        <CardContent>
          <Typography gutterBottom variant="h6" component="span">
            Zutaten:
          </Typography>
          <Typography style={{ whiteSpace: "pre-wrap" }}>
            {status.ingredients}
          </Typography>
          <Box mt={4} mb={4}>
            <Divider />
          </Box>
          <Typography style={{ whiteSpace: "pre-wrap" }}>
            {status.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={async () => {
              await addListItems(status.ingredients);
              navigate.push(LIST_PATH);
            }}
          >
            {status.title} zur Einkaufsliste hinzufügen
          </Button>
        </CardActions>
      </Card>
      <BottomRightFab
        onClick={() => navigate.push(getRecipeDetailEditPath(status.title))}
        label="Rezept bearbeiten"
        children={<Edit />}
      />
    </Box>
  );
};
