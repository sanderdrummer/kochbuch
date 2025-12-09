import { type ComponentProps, useId } from "react";
import { CrossIcon } from "./icons.tsx";
import { Input, InputAction } from "./input.tsx";

export type DataListProps = {
	items: string[];
} & Omit<SearchInputProps, "id">;
export const DataList = ({
	items,
	label,
	className,
	...props
}: DataListProps) => {
	const inputId = useId();
	const datalistId = useId();
	return (
		<>
			<SearchInput
				required
				label={label}
				list={datalistId}
				id={inputId}
				{...props}
			/>
			<datalist id={datalistId}>
				{items.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</datalist>
		</>
	);
};

export type SearchInputProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
} & Omit<ComponentProps<"input">, "value" | "onChange">;
export const SearchInput = ({
	label,
	value,
	onChange,
	...props
}: SearchInputProps) => {
	return (
		<Input
			aria-label={label}
			placeholder={label}
			value={value}
			action={
				value ? (
					<InputAction
						onClick={() => {
							onChange("");
						}}
						aria-label="Suche zurücksetzen"
					>
						<CrossIcon />
					</InputAction>
				) : undefined
			}
			onChange={(e) => onChange(e.target.value)}
			{...props}
		/>
	);
};
