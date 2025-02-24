import { useState, type ReactNode } from "react";
import { SpinnerIcon } from "./icons";
import { Bubble } from "./layout";

export const LoadingButton = ({
  disabled,
  onClick,
  label,
  icon,
  className,
  message,
}: {
  disabled?: boolean;
  onClick: () => Promise<void>;
  label: ReactNode;
  icon?: ReactNode;
  className?: string;
  message?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bubbleOpen, setIsBubbleOpen] = useState(false);
  return (
    <>
      {message && <Bubble open={bubbleOpen}>{message}</Bubble>}
      <button
        type="button"
        className={`p-3 pl-0 grid font-normal text-stone-400 gap-2 grid-flow-col content-center items-center ${
          className ?? ""
        }`}
        disabled={disabled || isLoading}
        onClick={() => {
          setIsBubbleOpen(false);
          setIsLoading(true);

          onClick()
            .then(() => {
              setIsBubbleOpen(true);
            })
            .finally(() => {
              setIsLoading(false);
              setTimeout(() => {
                setIsBubbleOpen(false);
              }, 2500);
            });
        }}
      >
        <span className="fill-stone-400 h-5 w-5">
          {isLoading ? <SpinnerIcon /> : icon}
        </span>
        {label}
      </button>
    </>
  );
};
