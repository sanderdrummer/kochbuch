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

const key = "shoppingList";
export const ListForm: React.FC<{ onCompleted(): void }> = ({
  onCompleted,
}) => {
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    const list = window.localStorage.getItem(key) || "";
    if (typeof list === "string") {
      setValue(list);
    }
  }, []);

  React.useEffect(() => {
    const id = setTimeout(() => {
      window.localStorage.setItem(key, value);
    }, 100);
    return () => {
      clearTimeout(id);
    };
  }, [value]);

  return (
    <Box>
      <Card>
        <CardHeader title="Einkaufsliste erweitern" />
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                addListItems(value);
                setValue("");
                onCompleted();
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <TextField
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
