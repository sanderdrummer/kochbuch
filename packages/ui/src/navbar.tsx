import { ReactNode } from "react";

export const Navbar = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <nav
      className={`w-full bg-stone-50 dark:bg-stone-700 sticky bottom-0 left-0 right-0`}
    >
      <div
        className={`p-2 pb-4 grid justify-center gap-8 grid-flow-col ${
          className ?? ""
        }`}
      >
        {children}
      </div>
    </nav>
  );
};
