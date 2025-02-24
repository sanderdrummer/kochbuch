import { ComponentProps, type ReactNode } from "react";

export const Header = ({ children }: { children: ReactNode }) => {
  return <header>{children}</header>;
};

export const H1 = ({
  className,
  children,
  ...properties
}: ComponentProps<"h1">) => {
  return (
    <h1
      className={`${className ?? ""} font-bold text-3xl mb-10 mt-4`}
      {...properties}
    >
      {children}
    </h1>
  );
};
