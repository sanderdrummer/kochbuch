import clsx from "clsx/lite";
import type { ComponentProps } from "react";

export const H1 = ({ className, ...props }: ComponentProps<"h1">) => {
	return (
		<h1 className={clsx(className, "text-6xl lg:text-8xl mb-12 lg:mb-20")} {...props} />
	);
};
export const P = ({ className, ...props }: ComponentProps<"p">) => {
	return <p className={clsx(className, "text-lg mb-2")} {...props} />;
};

