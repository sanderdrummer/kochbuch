"use client";

import { H1 } from "@kochbuch/ui/header";
import { PlusIcon } from "@kochbuch/ui/icons";
import { Button } from "@kochbuch/ui/inputs";
import { HeightWrapper } from "@kochbuch/ui/layout";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { useListStore, parseStringToListItems } from "../list-store";

export const AddListItems = () => {
  const { addTodo, itemsToAdd, setItemsToAdd } = useListStore();
  const router = useRouter();
  const id = useId();
  return (
    <HeightWrapper labeledBy={id} className="mx-auto container">
      <H1 id={id} className="ml-2">
        Auf die Einkaufsliste:
      </H1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const parsed = parseStringToListItems(itemsToAdd);
          addTodo(parsed);
          setItemsToAdd("");
          router.back();
        }}
      >
        <textarea
          className="mb-10 font-extralight w-full min-h-300 rounded block, p-4 placeholder-stone-500 border-stone-800 text-stone-400 bg-stone-800 focus:outline-none focus:border-stone-400 focus:ring-stone-400 focus:ring-1"
          style={{ resize: "none", height: "50vh" }}
          placeholder="Menge Artikel"
          value={itemsToAdd}
          onInput={(e) => setItemsToAdd(e.currentTarget.value)}
        />
        <Button
          className="ml-2"
          icon={<PlusIcon />}
          label="auf die Liste!"
          type="submit"
        />
      </form>
    </HeightWrapper>
  );
};
