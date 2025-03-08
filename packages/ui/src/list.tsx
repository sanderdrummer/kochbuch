import { ComponentProps, type ReactNode } from "react";
import Link from "next/link";

type ItemListProps<Item> = {
  items: Item[];
  emptyState: ReactNode;
  actions: (recipe: Item) => ReactNode;
  path: string;
};
export const ItemList = <Item extends { id: string | number; title: string }>({
  items,
  emptyState,
  actions,
  path,
}: ItemListProps<Item>) => {
  return (
    <div className="mx-auto container">
      <ul className="divide-y list-none divide-stone-800">
        {items?.length === 0 && (
          <div className="p-3 font-extralight text-lg">{emptyState}</div>
        )}
        {items.map((item) => (
          <ListItem key={item.title}>
            <Link className="p-3 no-underline " href={`${path}${item.id}`}>
              {item.title}
            </Link>
            <div className="flex gap-8">{actions(item)}</div>
          </ListItem>
        ))}
      </ul>
    </div>
  );
};

export const ListItem = ({ children, ...props }: ComponentProps<"li">) => {
  return (
    <li
      className="font-extralight text-lg grid grid-flow-col justify-between"
      {...props}
    >
      {children}
    </li>
  );
};
