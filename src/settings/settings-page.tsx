import React from "react";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { ExportRecipes, ImportRecipes } from "./import-export";
import { ApiUrlSetting } from "./api-url";

export const SettingsPage = () => {
  return (
    <Box>
      <Card>
        <CardHeader title="Rezepte exportieren"></CardHeader>
        <CardActions>
          <ExportRecipes />
        </CardActions>
      </Card>
      <Card style={{ marginTop: "1rem" }}>
        <CardHeader title="Rezepte importieren"></CardHeader>
        <CardContent>
          <ImportRecipes />
        </CardContent>
      </Card>
      <ApiUrlSetting />
    </Box>
  );
};
