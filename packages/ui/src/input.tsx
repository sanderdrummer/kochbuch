import clsx from "clsx/lite";
import { type ComponentProps, type ReactNode, useId } from "react";

export type SelectProps = { label: string } & ComponentProps<"select">;
export const Select = ({
	label,
	className,
	id: maybeId,
	...props
}: SelectProps) => {
	const fallbackId = useId();
	const id = maybeId ?? fallbackId;
	return (
		<div className="flex gap-4 items-center">
			<label htmlFor={id} className="mr-4 text-primary-600 font-normal text-xl">
				{label}:
			</label>
			<select
				className={clsx(className, "w-full appearance-none border-primary-default border-b outline-0 focus-visible:border-primary-950 text-xl")}
				id={id}
				{...props}
			/>
		</div>
	);
};

export const Option = ({ className, ...props }: ComponentProps<"option">) => {
	return <option className={className} {...props} />;
};
type InputProps = { action?: ReactNode } & ComponentProps<"input">;
export const Input = ({ className, action, ...props }: InputProps) => {
	return (
		<div className={"w-full relative"}>

			<input
				className={clsx("border-primary-default border rounded-4xl p-4 w-full outline-0 focus-visible:border-primary-950 h-16", className)}
				{...props}
			/>
			{action && <button type="button" className="absolute right-0" >
				{action}
			</button>}
		</div>

	)
}


export const TextArea = ({ className, action, ...props }: ComponentProps<'textarea'>) => {
	return (
		<textarea
			className={clsx("border-primary-default border rounded-4xl p-4 w-full outline-0 focus-visible:border-primary-950 h-16", className)}
			{...props}
		/>
	)
}
