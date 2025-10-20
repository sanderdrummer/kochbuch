"use client";

import { Dialog, useDialog } from "@kochbuch/ui/dialog";
import { Ingredient } from "../import/page";
import { Button, TextArea } from "@kochbuch/ui/inputs";
import { useState } from "react";

function parseIngredientString(ingredientString: string): Ingredient[] {
  const ingredients: Ingredient[] = [];
  const parts = ingredientString.split(",");

  for (const part of parts) {
    const trimmedPart = part.trim();
    const match = trimmedPart.match(/^(\d+(?:\.\d+)?)\s*(.*)/);

    let amount: string = "";
    let name = trimmedPart;
    let scale = "";

    if (match) {
      amount = match?.at?.(1) ?? "";
      name = match?.at?.(2)?.trim() ?? "";
    }

    const scaleMatch = name.match(/(\w+)$/);
    if (scaleMatch) {
      const potentialScale = scaleMatch[1] ?? "";
      const commonScales = [
        "g",
        "ml",
        "kg",
        "l",
        "TL",
        "tl",
        "EL",
        "el",
        "mg",
        "Dose",
        "Beutel",
      ];
      if (commonScales.includes(potentialScale)) {
        scale = potentialScale;
        name = name
          .slice(0, Math.max(0, name.lastIndexOf(potentialScale)))
          .trim();
      }
    }

    ingredients.push({ amount, scale, name });
  }

  return ingredients;
}
export const BulkAddDialog = ({
  onAdd,
}: {
  onAdd: (ingredients: Ingredient[]) => void;
}) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [rawString, setRawString] = useState("");
  return (
    <>
      <Button onClick={openDialog} label="Importiere Zutaten" />
      <Dialog onClose={closeDialog} isOpen={isOpen}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const ingredientsString = parseIngredientString(rawString);
            onAdd([]);
          }}
        >
          <TextArea
            name="ingredients"
            label="Zutaten"
            onChange={(e) => {
              setRawString(e.target.value);
            }}
          />
          <Button type="submit" label="importieren" />
          <pre>{JSON.stringify(parseIngredientString(rawString))}</pre>
        </form>
      </Dialog>
    </>
  );
};
