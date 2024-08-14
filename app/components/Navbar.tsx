import { RecipeNavTab, RecipePlanNavTab } from "./Tabs";

export const Navbar = (props: { className?: string }) => {
  return (
    <nav
      className={`w-full bg-stone-50 dark:bg-stone-700 sticky bottom-0 left-0 right-0`}
    >
      <div
        className={`p-2 pb-4 grid justify-center gap-8 grid-flow-col ${props.className ?? ""
          }`}
      >
        <RecipeNavTab />
        <RecipePlanNavTab />
      </div>
    </nav>
  );
};
