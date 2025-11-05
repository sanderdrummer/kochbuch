import clsx from "clsx/lite";
import type { ComponentProps } from "react";
import { sharedInputClassName } from "./shared-input-styles.ts";

export const Button = ({
	type = "button",
	className = "",
	...props
}: ComponentProps<"button">) => {
	return (
		<button
			className={clsx(className, sharedInputClassName)}
			type={type}
			{...props}
		/>
	);
};
