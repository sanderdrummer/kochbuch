import { ComponentProps, useState, type ReactNode } from "react";
import { SpinnerIcon } from "./icons";
import { Bubble } from "./layout";

export const Button = ({
  type = "button",
  className,
  icon,
  label,
  ...props
}: ComponentProps<"button"> & { icon?: ReactNode; label: ReactNode }) => {
  return (
    <button
      type={type ?? "button"}
      className={`p-3 pl-0 grid font-normal text-stone-400 gap-2 grid-flow-col content-center items-center ${className ?? ""
        }`}
      {...props}
    >
      {icon && <span className="fill-stone-400 h-5 w-5">{icon}</span>}
      {label}
    </button>
  );
};

export const LoadingButton = (props: {
  disabled?: boolean;
  onClick?: () => Promise<void>;
  label: ReactNode;
  icon?: ReactNode;
  className?: string;
  message?: string;
  type?: "submit" | "button";
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bubbleOpen, setIsBubbleOpen] = useState(false);
  return (
    <>
      {props.message && <Bubble open={bubbleOpen}>{props.message}</Bubble>}
      <Button
        icon={isLoading ? <SpinnerIcon /> : props.icon}
        className={props.className}
        disabled={props.disabled || isLoading}
        label={props.label}
        onClick={() => {
          setIsBubbleOpen(false);
          if (props.onClick) {
            setIsLoading(true);
            props
              .onClick()
              .then(() => {
                setIsBubbleOpen(true);
              })
              .finally(() => {
                setIsLoading(false);
                setTimeout(() => {
                  setIsBubbleOpen(false);
                }, 2500);
              });
          }
        }}
      />
    </>
  );
};
