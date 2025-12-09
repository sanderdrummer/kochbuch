import clsx from "clsx/lite";
import type { ComponentProps } from "react";

export type ListProps = ComponentProps<"ul">;

export const List = ({ className, ...props }: ListProps) => {
	return (
		<ul
			className={clsx(
				"w-full divide-y divide-gray-800 border border-gray-800 rounded-3xl bg-surface-default",
				className,
			)}
			{...props}
		/>
	);
};

export type ListItemProps = ComponentProps<"li">;

export const ListItem = ({ className, ...props }: ListItemProps) => {
	return (
		<li
			className={clsx(
				"p-6",
				"text-lg text-gray-200",
				"hover:bg-gray-800 transition-colors duration-200",
				className,
			)}
			{...props}
		/>
	);
};
