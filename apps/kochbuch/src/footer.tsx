import { FooterNav } from "@sander/ui/layout";
import clsx from "clsx/lite";
import type { ComponentProps } from "react";
import { Link } from "./router"; // Assuming this accepts standard anchor props

/**
 * NavTab: A reusable wrapper for navigation links to ensure consistent
 * height, touch targets, and accessibility states.
 */
const NavTab = ({
	className,
	children,
	isActive, // You can pass this prop based on your router's logic (e.g., useLocation)
	...props
}: ComponentProps<typeof Link> & { isActive?: boolean }) => {
	return (
		<Link
			className={clsx(
				// Layout & Sizing (Matches Button/Input height of h-16)
				"h-16 w-full flex flex-col items-center justify-center gap-1",

				// Typography
				"text-xs font-medium tracking-wide uppercase",

				// Colors & State (Gray by default, Neon when hovered/active)
				isActive
					? "text-primary-400 bg-gray-900/50"
					: "text-gray-400 hover:text-primary-300 hover:bg-gray-900/30",

				// Transitions
				"transition-colors duration-200 rounded-2xl",

				// Accessibility
				"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
				className,
			)}
			// Accessibility: visual indicators for screen readers
			aria-current={isActive ? "page" : undefined}
			{...props}
		>
			{children}
		</Link>
	);
};

export const AppFooter = () => {
	const pathname = window.location.hash;
	return (
		<FooterNav
			className={clsx(
				"w-full border-t border-gray-800 bg-background/95 backdrop-blur-sm",
				"grid grid-cols-2 m-4 gap-2",
				"sticky bottom-0",
			)}
		>
			<NavTab isActive={pathname.includes("/recipes")} to="recipes">
				{/* Icon size: w-6 h-6 (24px) - Standard touch icon size */}
				<svg
					className="w-6 h-6 mb-0.5"
					fill="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
					<path d="M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99zM13 12.49v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26V11.9c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.3-4.5.83zM17.5 14.33c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26v-1.52c-.79-.16-1.64-.24-2.5-.24z" />
				</svg>
				Rezepte
			</NavTab>

			<NavTab isActive={pathname.includes("/list")} to="list">
				<svg
					className="w-6 h-6 mb-0.5"
					fill="currentColor"
					aria-hidden="true"
					viewBox="0 0 24 24"
				>
					<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
				</svg>
				Einkaufsliste
			</NavTab>
		</FooterNav>
	);
};
