import React from "react";

// @ts-ignore
import { Save } from "@material-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button
} from "@material-ui/core";

import { addListItems } from "../db";

export const ListForm: React.FC<{ onCompleted(): void }> = ({
  onCompleted
}) => {
  return (
    <Box>
      <Card>
        <CardHeader title="Einkaufsliste erweitern" />
        <CardContent>
          <form
            onSubmit={async e => {
              e.preventDefault();
              const form = e.currentTarget;
              try {
                await addListItems(form.listItems.value);
                form.reset();
                onCompleted();
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <TextField
              multiline
              fullWidth
              name="listItems"
              label="Einkaufsliste"
              required
            />
            <Button type="submit" startIcon={<Save />}>
              speichern
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
