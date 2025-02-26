"use client";

import { H1 } from "@kochbuch/ui/header";
import { Button } from "@kochbuch/ui/inputs";
import { PlusIcon } from "@kochbuch/ui/icons";
import { HeightWrapper } from "@kochbuch/ui/layout";
import Link from "next/link";
import { useId } from "react";
import { useListStore, ListItem } from "./list-store";

export const ListView = () => {
  const { todo, done, clear, markAsDone, markAsTodo } = useListStore();
  const id = useId();
  return (
    <HeightWrapper labeledBy={id} className="mx-auto container">
      <div className="grid grid-flow-col items-start mx-2">
        <H1 id={id}>Einkaufsliste</H1>
        <Link
          className="p-4 pt-4 text-lg grid grid-flow-col gap-2 text-stone-300 justify-end items-center"
          href="list/add"
        >
          <PlusIcon className="fill-stone-300 h-7 w-7" />
          Mehr einkaufen
        </Link>
      </div>
      <ItemList
        heading="Noch in den Korb"
        action={(item) => {
          markAsDone(item);
        }}
        emptyState="Nichts mehr einzukaufen!"
        items={todo}
      />
      <ItemList
        heading="Schon dabei"
        action={(item) => {
          markAsTodo(item);
        }}
        emptyState="Noch nichts eingekauft!"
        items={done}
      />

      {(done.length ?? 0) > 0 && (
        <Button
          className="text-red-400 mt-10 mb-8"
          label="Neue Liste"
          onClick={() => {
            clear();
          }}
        />
      )}
    </HeightWrapper>
  );
};

const ItemList = (props: {
  items: ListItem[];
  emptyState: string;
  heading: string;
  action: (item: ListItem) => void;
}) => {
  return (
    <div className="mt-5 p-3">
      <h2 className="text-2xl font-normal">{props.heading}</h2>
      <ul className="divide-y list-none divide-stone-800">
        {props.items.length === 0 && (
          <li className="p-3 font-extralight text-lg">{props.emptyState}</li>
        )}
        {props.items.map((item) => (
          <li
            key={item.id}
            className="font-extralight text-lg grid grid-flow-col justify-between"
          >
            <Button
              label={
                <span>
                  {item.amount}
                  {item.scale} {item.title}
                </span>
              }
              onClick={() => props.action(item)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
