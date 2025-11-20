import clsx from "clsx/lite";
import type { ComponentProps } from "react";

export const H1 = ({ className, ...props }: ComponentProps<"h1">) => {
	return (
		<h1 className={clsx(className, "text-6xl lg:text-8xl")} {...props} />
	);
};
export const H2 = ({ className, ...props }: ComponentProps<"h2">) => {
	return (
		<h2 className={clsx(className, "text-xl lg:text-2xl")} {...props} />
	);
};
export const P = ({ className, ...props }: ComponentProps<"p">) => {
	return <p className={clsx(className, "text-lg mb-2")} {...props} />;
};

