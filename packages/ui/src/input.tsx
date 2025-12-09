import clsx from "clsx/lite";
import { type ComponentProps, type ReactNode, useId } from "react";

export type SelectProps = {
	label: string;
	containerClassName?: string;
} & ComponentProps<"select">;

export const Select = ({
	label,
	className,
	containerClassName,
	id: maybeId,
	children,
	...props
}: SelectProps) => {
	const fallbackId = useId();
	const id = maybeId ?? fallbackId;

	return (
		<div className={clsx("flex flex-col gap-2 w-full", containerClassName)}>
			<label
				htmlFor={id}
				className="ml-2 text-primary-600 font-medium text-base"
			>
				{label}
			</label>

			<div className="relative w-full">
				<select
					id={id}
					className={clsx(
						// Layout & Sizing
						"h-16 w-full pl-6 pr-12 py-4 appearance-none",

						// Appearance
						"rounded-4xl border border-primary-default bg-surface-default",

						// Typography
						"text-lg text-foreground",

						// Accessibility
						"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
						"cursor-pointer",

						className,
					)}
					{...props}
				>
					{children}
				</select>

				{/* Custom Chevron for Flat Design */}
				<div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2">
					<svg
						aria-hidden="true"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-primary-default"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				</div>
			</div>
		</div>
	);
};

export const Option = ({ className, ...props }: ComponentProps<"option">) => {
	return (
		<option
			className={clsx("bg-gray-900 text-gray-100 py-2", className)}
			{...props}
		/>
	);
};

type InputProps = {
	action?: ReactNode;
	containerClassName?: string;
} & ComponentProps<"input">;

export const Input = ({
	className,
	containerClassName,
	action,
	type = "text",
	...props
}: InputProps) => {
	return (
		<div className={clsx("relative w-full", containerClassName)}>
			<input
				type={type}
				className={clsx(
					// Layout & Sizing
					"h-16 w-full py-4 pl-6",
					// Add extra padding right if there is an action button to prevent text overlap
					action ? "pr-16" : "pr-6",

					// Appearance
					"rounded-4xl border border-primary-default bg-surface-default",

					// Typography
					"text-lg text-foreground placeholder:text-gray-500",

					// Accessibility
					"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
					"transition-colors-shadow",

					className,
				)}
				{...props}
			/>
			{action}
		</div>
	);
};

export const InputAction = (props: ComponentProps<"button">) => {
	return (
		<button
			type="button"
			className="w-8 h-8 absolute right-4 top-1/2 -translate-y-1/2"
			{...props}
		/>
	);
};

export const TextArea = ({
	className,
	...props
}: ComponentProps<"textarea">) => {
	return (
		<textarea
			className={clsx(
				// Layout
				"min-h-16 w-full py-4 px-6",

				// Appearance
				"rounded-4xl border border-primary-default bg-surface-default",

				// Typography
				"text-lg text-foreground placeholder:text-gray-500",

				// Accessibility
				"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
				"resize-y",

				className,
			)}
			{...props}
		/>
	);
};
