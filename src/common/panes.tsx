import { ReactNode } from "react";

export const Pane = ({ children, className }: { children: ReactNode, className?:string }) => {
  return (
    <div
      className={className}
      css={{
        background: "var(--headerBackground)",
        padding: "1rem",
      }}
    >
      {children}
    </div>
  );
};
