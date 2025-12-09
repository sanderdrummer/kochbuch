import clsx from "clsx/lite";
import type { ComponentProps } from "react";

export const H1 = ({ className, ...props }: ComponentProps<"h1">) => {
	return (
		<h1
			className={clsx(
				className,
				// Mobile: 6xl (3.75rem / 60px)
				// Desktop: 7xl (4.5rem / 72px)
				"text-6xl lg:text-7xl",
				"font-bold tracking-tight text-primary-50 leading-tight",
			)}
			{...props}
		/>
	);
};

export const H2 = ({ className, ...props }: ComponentProps<"h2">) => {
	return (
		<h2
			className={clsx(
				className,
				// Mobile: 3xl (1.875rem / 30px) - Exactly half of H1
				// Desktop: 4xl (2.25rem / 36px) - Exactly half of H1
				"text-3xl lg:text-4xl",
				"font-semibold text-primary-100 leading-snug",
			)}
			{...props}
		/>
	);
};

export const P = ({ className, ...props }: ComponentProps<"p">) => {
	return (
		<p
			className={clsx(
				className,
				// Using gray-300 for better readability on dark backgrounds (less eye strain than pure white)
				"text-xl text-gray-300 leading-relaxed mb-4",
			)}
			{...props}
		/>
	);
};
