import { ComponentProps, useId, useState, type ReactNode } from "react";
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

const useFallbackId = (id?: string) => {
  const fallBackId = useId();
  return id ?? fallBackId;
};

export type InputContextProps = {
  label: ReactNode;
  children: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
  invalid?: boolean;
  helperTextId: string;
} & ComponentProps<"label">;
type InputContextConsumerProps = Omit<
  InputContextProps,
  "children" | "helperTextId" | "onChange"
>;
export const InputContext = ({
  children,
  label,
  helperText,
  helperTextId,
  required,
  invalid,
  className,
  ...props
}: InputContextProps) => {
  return (
    <div className={className}>
      <label {...props}>
        {label}
        {required ? "*" : ""}:
      </label>
      {children}
      {helperText && (
        <p
          className={`mt-2 ${invalid ? "text-red-200" : ""}`}
          id={helperTextId}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export const TextArea = ({
  id: initialId,
  label,
  helperText,
  ...props
}: ComponentProps<"textarea"> & InputContextConsumerProps) => {
  const id = useFallbackId(initialId);
  const helperTextId = useId();
  return (
    <InputContext
      htmlFor={id}
      label={label}
      helperTextId={helperTextId}
      helperText={helperText}
      required={props.required}
      invalid={Boolean(props["aria-invalid"])}
    >
      <textarea
        id={id}
        aria-describedby={helperText ? helperTextId : undefined}
        className="font-extralight w-full rounded block, p-4 placeholder-stone-500 border-stone-800 text-stone-400 bg-stone-800 focus:outline-none focus:border-stone-400 focus:ring-stone-400 focus:ring-1"
        {...props}
      />
    </InputContext>
  );
};

export const Input = ({
  id: initialId,
  label,
  helperText,
  className = "",
  ...props
}: ComponentProps<"input"> & InputContextConsumerProps) => {
  const id = useFallbackId(initialId);
  const helperTextId = useId();
  return (
    <InputContext
      className={className}
      htmlFor={id}
      label={label}
      helperTextId={helperTextId}
      helperText={helperText}
      required={props.required}
      invalid={Boolean(props["aria-invalid"])}
    >
      <input
        id={id}
        aria-describedby={helperText ? helperTextId : undefined}
        className={`font-extralight w-full rounded block, p-4 placeholder-stone-500 border-stone-800 text-stone-400 bg-stone-800 focus:outline-none focus:border-stone-400 focus:ring-stone-400 focus:ring-1`}
        {...props}
      />
    </InputContext>
  );
};
