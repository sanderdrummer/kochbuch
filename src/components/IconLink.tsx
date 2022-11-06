import { A } from "@solidjs/router";
import { JSX } from "solid-js";

export const IconLink = (props: {
  icon: JSX.Element;
  label: JSX.Element;
  href: string;
}) => {
  return (
    <A
      class="font-extralight grid min-w-min align-items-center justify-items-center fill-stone-500 hover:fill-stone-300 text-stone-500 hover:text-stone-300"
      activeClass="text-stone-300 fill-stone-300"
      href={props.href}
    >
      <div class="w-8">{props.icon}</div>
      <div>{props.label}</div>
    </A>
  );
};
