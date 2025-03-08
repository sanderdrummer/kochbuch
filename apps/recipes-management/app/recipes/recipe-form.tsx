"use client";

import { useForm } from "react-hook-form";
import type { RecipeInsert } from "../../db/recipe-service";
import { Button, Input, TextArea } from "@kochbuch/ui/inputs";
import type { FieldErrors, FieldValues } from "react-hook-form";

export type Recipe = RecipeInsert;
export type Response = {
  success?: Recipe;
  errors?: Record<keyof Recipe, string>;
};

export const renderErrorMessage = <Values extends FieldValues>(
  name: keyof Values,
  errors: FieldErrors<Values>,
): string | undefined => {
  const fieldErrors = errors?.[name]?.message;
  if (Array.isArray(fieldErrors)) {
    return fieldErrors.join(", ");
  }
  if (typeof fieldErrors === "string") {
    return fieldErrors;
  }
  return;
};

export const RecipeForm = ({
  action,
  initialValues,
}: {
  action: (formData: FormData) => Promise<void>;
  initialValues?: Recipe;
}) => {
  const { register, handleSubmit, formState } = useForm<Recipe>({
    values: initialValues,
  });
  return (
    <form
      className="grid gap-4"
      noValidate
      action={action}
      onSubmit={async (e) => {
        handleSubmit(async () => {
          action(new FormData(e.target as HTMLFormElement));
        })(e);
      }}
    >
      <input hidden {...register("id")} />
      <Input
        label="Rezept Name"
        {...register("title", {
          required: "Bitte ausfüllen!",
        })}
        required
        aria-invalid={Boolean(formState.errors.title)}
        placeholder="Carbonara"
        helperText={renderErrorMessage("title", formState.errors)}
      />
      <TextArea
        label="Beschreibung"
        {...register("description")}
        placeholder="..."
        helperText={renderErrorMessage("description", formState.errors)}
      />
      <Button label="submit" type="submit" />
    </form>
  );
};
