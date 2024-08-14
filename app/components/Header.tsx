import { type ReactNode } from "react";

export const Header = (props: { children: ReactNode }) => {
  return <header>{props.children}</header>;
};

export const H1 = (props: { children: ReactNode; className?: string }) => {
  return (
    <h1 className={`${props.className ?? ""} font-bold text-3xl mb-10 mt-4`}>
      {props.children}
    </h1>
  );
};
