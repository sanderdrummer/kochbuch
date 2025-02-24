import Link from "next/link";
import { type ReactNode } from "react";

export const IconLink = ({
  icon,
  label,
  to,
}: {
  icon: ReactNode;
  label: ReactNode;
  to: string;
}) => {
  return (
    <Link
      className="font-extralight gap-1 grid align-items-center justify-items-center fill-stone-500 hover:fill-stone-300 text-stone-500 hover:text-stone-300"
      to={to}
    >
      <span className="size-8">{icon}</span>
      {label}
    </Link>
  );
};
