"use client";

import { useFieldArray, useForm } from "react-hook-form";
import type { FullRecipe } from "../../db/recipe-service";
import { Button, Input, TextArea } from "@kochbuch/ui/inputs";
import type { FieldErrors, FieldValues } from "react-hook-form";
import { BulkAddDialog } from "./bulk-add-dialog";

export type Response = {
  success?: FullRecipe;
  errors?: Record<keyof FullRecipe, string>;
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
  action: (formData: FullRecipe) => Promise<void>;
  initialValues?: FullRecipe;
}) => {
  const { register, control, handleSubmit, formState } = useForm({
    values: initialValues,
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "ingredients", // unique name for your Field Array
  });
  console.log(initialValues);
  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={async (e) => {
        handleSubmit(async (values) => {
          await action(values);
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
      <BulkAddDialog onAdd={() => { }} />
      {fields.map((field, index) => (
        <div key={field.id} className="grid items-center md:flex gap-2">
          <input hidden {...register(`ingredients.${index}.id`)} />
          <Input
            className="flex-initial w-20"
            label="Anzahl"
            {...register(`ingredients.${index}.amount`)}
          />
          <Input
            className="flex-initial w-16"
            label="Einheit"
            {...register(`ingredients.${index}.scale`)}
          />
          <Input
            className="flex-1"
            label="Zutat"
            {...register(`ingredients.${index}.name`)}
          />
          <Button
            className="flex-initial w-15"
            onClick={() => remove(index)}
            label="-"
            aria-label={`${field.name} aus der List nehmen`}
          />
        </div>
      ))}
      <Button
        onClick={() => append({ name: "" })}
        label="Neue Zutat hinzufügen"
      />
      <TextArea
        rows={20}
        label="Beschreibung"
        {...register("description")}
        placeholder="..."
        helperText={renderErrorMessage("description", formState.errors)}
      />
      <Button label="submit" type="submit" />
    </form>
  );
};
