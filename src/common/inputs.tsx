import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, useId } from "react";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  action?: ReactNode,
};
export const TextInput = ({ action, label, className, ...props }: TextInputProps) => {
  return (
    <label
      className={className}
      css={{
        position: 'relative',
        display: "block",
        color: "var(--textSubtile)",
        transitionDuration: ".4s",
        fontSize: "1rem",
        "&:focus-within": {
          color: "var(--primary)",
        },
      }}
    >
      {label}
      <input
        css={{
          display: "block",
          borderRadius:0,
          width: "100%",
          fontSize: "1rem",
          background: "transparent",
          border: "none",
          color: "var(--text)",
          padding: "0.25rem 0",
          transitionDuration: ".4s",
          borderBottom: "solid 3px var(--border)",
          "&:focus": {
            borderColor: "var(--primary)",
          },
        }}
        type="text"
        {...props}
      />
      {action}
    </label>
  );
};

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "primary";
};
export const TextButton = ({ color, ...props }: TextButtonProps) => {
  return (
    <button
      css={{
        padding: 0,
        margin: 0,
        background: "none",
        border: "none",
        color: `var(${color ? "--primary" : "--textSubtile"})`,
        transitionDuration: ".4s",
        "&:disabled": {
          color: "var(--defaultFillColor)",
        },
        "&:hover": {
          color: "var(--primary)",
        },
        "&:active": {
          color: "var(--primary)",
        },
      }}
      {...props}
    />
  );
};
