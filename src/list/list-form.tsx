import React from "react";

import { addListItems } from "./list-hooks";
import { useLocalStorage } from "../common/useLocalStorage";

const key = "shoppingList";
export const ListForm: React.FC<{ onCompleted(): void }> = ({
  onCompleted,
}) => {
  const [value, setValue] = useLocalStorage(key, "");

  return (
    <div>
      <div>
        <div title="Einkaufsliste erweitern" />
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              addListItems(value.split("\n"));
              setValue("");
              onCompleted();
            }}
          >
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              multiline
              fullWidth
              name="listItems"
              label="Einkaufsliste"
              required
            />
            <button type="submit" startIcon={<Save />}>
              speichern
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
