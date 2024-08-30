import { useNavigate } from "@remix-run/react";
import { H1 } from "~/components/Header";
import { PlusIcon } from "~/components/Icons";
import { LoadingButton } from "~/components/Inputs";
import { HeightWrapper } from "~/components/Layout";
import { addItemsToList, parseStringToListItems } from "./ListResource";
import { useId, useState } from "react";

export default function AddListItems() {
  const [items, setItems] = useState("");
  const navigate = useNavigate();
  const id = useId();
  return (
    <HeightWrapper labeledBy={id} className="mx-auto container">
      <H1 id={id} className="ml-2">
        Auf die Einkaufsliste:
      </H1>
      <textarea
        className="mb-10 font-extralight w-full min-h-300 rounded block, p-4 placeholder-stone-500 border-stone-800 text-stone-400 bg-stone-800 focus:outline-none focus:border-stone-400 focus:ring-stone-400 focus:ring-1"
        style={{ resize: "none", height: "50vh" }}
        placeholder="Menge Artikel"
        value={items}
        onInput={(e) => setItems(e.currentTarget.value)}
      />

      <LoadingButton
        className="ml-2"
        icon={<PlusIcon />}
        message="Zur Einkaufsliste hinzugefügt"
        label="auf die Liste!"
        onClick={async () => {
          const parsed = parseStringToListItems(items);
          await addItemsToList(parsed);
          navigate("/list");
        }}
      />
    </HeightWrapper>
  );
}
