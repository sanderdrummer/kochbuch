import React from "react";

import {
  Box,
  Typography,
  Divider,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions
} from "@material-ui/core";
import { ExportRecipes, ImportRecipes } from "./import-export";

export const SettingsPage = () => {
  return (
    <Box>
      <Typography>Einstellungen</Typography>
      <Divider />
      <Card>
        <CardHeader title="Rezepte"></CardHeader>
        <CardActions>
          <ExportRecipes />
        </CardActions>
      </Card>
      <Card>
        <CardContent>
          <ImportRecipes />
        </CardContent>
      </Card>
    </Box>
  );
};
