import clsx from "clsx/lite";
import type { ComponentProps } from "react";

export type ListProps = ComponentProps<"ul">;

export const List = ({ className, ...props }: ListProps) => {
	return <ul className={className} {...props} />;
};

export type ListItemProps = ComponentProps<"li">;

export const ListItem = ({ className, ...props }: ListItemProps) => {
	return (
		<li
			className={clsx(className, "p-4 border-b border-primary-950 text-lg")}
			{...props}
		/>
	);
};
