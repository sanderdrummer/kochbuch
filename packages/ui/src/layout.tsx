import clsx from "clsx/lite";
import type { ComponentProps, ReactNode } from "react";

type HeaderNavProps = ComponentProps<"nav">;
export const HeaderNav = ({ className, ...props }: HeaderNavProps) => {
	return <nav className={clsx(className, "p-4")} {...props} />;
};

type ContentNavProps = ComponentProps<"div">;
export const Content = ({ className, ...props }: ContentNavProps) => {
	return <div className={clsx(className, "flex-grow p-4")} {...props} />;
};

type FooterNavProps = ComponentProps<"nav">;
export const FooterNav = ({ className, ...props }: FooterNavProps) => {
	return <nav className={clsx(className, "p-4")} {...props} />;
};

export const FlexContainer = ({ children }: { children: ReactNode }) => {
	return (
		<div className="container mx-auto flex flex-col min-h-screen">
			{children}
		</div>
	);
};
type DividerProps = {
	label?: string;
	variant?: "subtle" | "neon";
} & ComponentProps<"div">;

export const Divider = ({
	className,
	label,
	variant = "subtle",
	...props
}: DividerProps) => {
	// The line style logic
	const lineClass = clsx(
		"h-px w-full rounded-full flex-1",
		variant === "subtle" && "bg-gray-800",
		variant === "neon" &&
			"bg-gradient-to-r from-transparent via-primary-500 to-transparent shadow-[0_0_4px_var(--color-primary-500)] opacity-80",
	);

	if (label) {
		return (
			<div
				className={clsx("flex items-center gap-4 py-6 w-full", className)}
				{...props}
			>
				<div className={lineClass} />
				<span className="text-xs font-bold tracking-widest uppercase text-gray-500 shrink-0 px-2">
					{label}
				</span>
				<div className={lineClass} />
			</div>
		);
	}

	return (
		<div
			className={clsx("flex items-center py-6 w-full", className)}
			{...props}
		>
			<div className={lineClass} />
		</div>
	);
};
