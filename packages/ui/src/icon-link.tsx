import Link from "next/link";
import { type ReactNode } from "react";

export const IconLink = ({
  icon,
  label,
  href,
}: {
  icon: ReactNode;
  label: ReactNode;
  href: string;
}) => {
  return (
    <Link
      className="font-extralight gap-1 grid align-items-center justify-items-center fill-stone-500 hover:fill-stone-300 text-stone-500 hover:text-stone-300"
      href={href}
    >
      <span className="size-8">{icon}</span>
      {label}
    </Link>
  );
};
