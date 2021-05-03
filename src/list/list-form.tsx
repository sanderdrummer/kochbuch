import React from "react";

// @ts-ignore
import { Save } from "@material-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";
import { addListItems } from "./list-hooks";
import { useLocalStorage } from "../common/useLocalStorage";

const key = "shoppingList";
export const ListForm: React.FC<{ onCompleted(): void }> = ({
  onCompleted,
}) => {
  const [value, setValue] = useLocalStorage(key, "");

  return (
    <Box>
      <Card>
        <CardHeader title="Einkaufsliste erweitern" />
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              addListItems(value.split("\n"));
              setValue("");
              onCompleted();
            }}
          >
            <TextField
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
