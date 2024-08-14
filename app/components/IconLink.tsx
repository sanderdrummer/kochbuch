import { Link } from "@remix-run/react";
import { type ReactNode } from "react";

export const IconLink = (props: {
  icon: ReactNode;
  label: ReactNode;
  to: string;
}) => {
  return (
    <Link
      className="font-extralight grid min-w-min align-items-center justify-items-center fill-stone-500 hover:fill-stone-300 text-stone-500 hover:text-stone-300"
      to={props.to}
    >
      {props.icon}
      {props.label}
    </Link>
  );
};
