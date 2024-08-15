import { type ReactNode } from "react";

export const HeightWrapper = (props: {
  className?: string;
  children: ReactNode;
  labeledBy: string;
}) => {
  return (
    <section
      aria-labelledby={props.labeledBy}
      className={`min-h-screen ${props?.className ?? ""}`}
    >
      {props.children}
    </section>
  );
};

export const LinearProgress = (props: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={`fixed inset-x-0 top-0 z-50 ${props.className ?? ""}`}>
      <div className="h-1 bg-blue-500" />
    </div>
  );
};

export const Bubble = (props: {
  open: boolean;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      style={{ display: props.open ? "block" : "none" }}
      className={`${props.className ?? ""} transition transition-opacity ${props.open ? "opacity-100" : "opacity-0"
        } shadow bg-stone-700 text-stone-400 font-normal fixed top-5 right-5 p-5 rounded`}
    >
      {props.children}
    </div>
  );
};
