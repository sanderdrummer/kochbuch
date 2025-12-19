import clsx from "clsx/lite";
import type { ComponentProps } from "react";

export const Button = ({
	type = "button",
	className,
	children,
	size,
	...props
}: ComponentProps<"button"> & { size?: "compact" }) => {
	return (
		<button
			type={type}
			className={clsx(
				// Layout & Sizing
				!size && "h-16 px-8 w-full sm:w-auto",
				size === "compact" && "h-12 px-4 w-full sm:w-auto",
				"flex items-center justify-center shrink-0",

				// Appearance
				"rounded-4xl border border-primary-default bg-surface-default",

				// Typography
				"text-primary-50 font-medium text-lg",

				// Interaction / State
				"cursor-pointer transition-colors-shadow duration-200",
				"hover:bg-gray-800 hover:shadow-neon-sm",
				"active:scale-[0.98]",

				// Accessibility
				"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",

				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};
