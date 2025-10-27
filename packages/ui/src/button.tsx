import type { ComponentProps } from "react";

export const Button = ({
	type = "button",
	...props
}: ComponentProps<"button">) => {
	return <button type={type} {...props} />;
};
