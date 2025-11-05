import clsx from "clsx/lite";
import { type ComponentProps, useId } from "react";

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
