import clsx from "clsx/lite";
import type { ComponentProps, ReactNode } from "react";

type HeaderNavProps = ComponentProps<"nav">;
export const HeaderNav = ({ className, ...props }: HeaderNavProps) => {
	return <nav className={clsx(className, "border-b border-primary-950 p-4")} {...props} />;
};

type ContentNavProps = ComponentProps<"div">;
export const Content = ({ className, ...props }: ContentNavProps) => {
	return <div className={clsx(className, "flex-grow p-4")} {...props} />;
};

type FooterNavProps = ComponentProps<"nav">;
export const FooterNav = ({ className, ...props }: FooterNavProps) => {
	return <nav className={clsx(className, "border-t border-primary-950 p-4")} {...props} />;
};

export const FlexContainer = ({ children }: { children: ReactNode }) => {
	return (
		<div className="container mx-auto flex flex-col min-h-screen">
			{children}
		</div>
	);
};
