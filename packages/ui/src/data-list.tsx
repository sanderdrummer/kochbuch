import clsx from "clsx/lite";
import { type ComponentProps, useId } from "react";
import {CrossIcon} from "./icons.tsx";

export type DataListProps = { items: string[]; label: string } & Omit<
	ComponentProps<"input">,
	"id"
>;
export const DataList = ({
	items,
	label,
	className,
	...props
}: DataListProps) => {
	const inputId = useId();
	const datalistId = useId();
	return (
		<div className={clsx(className, "w-full")}>
			<input
				required
				aria-label={label}
				placeholder={label}
				className="border-primary-default border rounded-4xl p-4 w-full outline-0 focus-visible:border-primary-950 h-16"
				list={datalistId}
				id={inputId}
				{...props}
			/>
            <button type="button" aria-label="Suche zurücksetzen" >
               <CrossIcon />
            </button>

			<datalist id={datalistId}>
				{items.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</datalist>
		</div>
	);
};
