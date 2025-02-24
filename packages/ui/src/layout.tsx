import { type ReactNode } from "react";

export const HeightWrapper = ({
  className,
  children,
  labeledBy,
}: {
  className?: string;
  children: ReactNode;
  labeledBy: string;
}) => {
  return (
    <section
      aria-labelledby={labeledBy}
      className={`min-h-screen ${className ?? ""}`}
    >
      {children}
    </section>
  );
};

export const LinearProgress = ({
  className,
  label,
}: {
  className?: string;
  label: string;
}) => {
  return (
    <div
      role="progressbar"
      aria-label={label}
      className={`fixed inset-x-0 top-0 z-50 ${className ?? ""}`}
    >
      <div className="h-1 bg-blue-500" />
    </div>
  );
};

export const Bubble = ({
  open,
  className,
  children,
}: {
  open: boolean;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      style={{ display: open ? "block" : "none" }}
      className={`${className ?? ""} z-10 transition transition-opacity ${open ? "opacity-100" : "opacity-0"
        } shadow bg-stone-700 text-stone-400 font-normal fixed bottom-35 right-5 p-5 rounded`}
    >
      {children}
    </div>
  );
};
