import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useReducer,
} from "react";

// 1. Updated Type: Added unique ID
export type ListItem = {
	id: string;
	title: string;
};

export type ShoppingList = {
	todo: ListItem[];
	done: ListItem[];
};

export type ShoppingListAction =
	| { type: "ADD_BULK_TODO"; payload: ListItem[] }
	| { type: "MOVE_TODO_TO_DONE"; payload: ListItem }
	| { type: "MOVE_DONE_TO_TODO"; payload: ListItem }
	| { type: "CLEAR_DONE" };

// Helper to generate IDs (falls back to random string if crypto not available)
const generateId = () => {
	if (typeof crypto !== "undefined" && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	return Math.random().toString(36).substring(2, 15);
};

// 2. Updated Filter: Filters by ID now, not title
const filterItem = (list: ListItem[], item: ListItem) =>
	list.filter((i) => i.id !== item.id);

/**
 * Parses and merges a list of shopping items.
 * Preserves the ID of the first item found in a matching group.
 */
const consolidateList = (items: ListItem[]): ListItem[] => {
	// Map stores the ID alongside the parsing data
	const map = new Map<
		string,
		{ amount: number; unit: string; label: string; id: string }
	>();
	const unparseableItems: ListItem[] = [];

	items.forEach((item) => {
		const match = item.title.trim().match(/^([\d,.]+)(.*)$/);

		if (!match) {
			unparseableItems.push(item);
			return;
		}

		const rawAmount = match[1];
		const remainder = match[2];
		const amount = parseFloat(rawAmount.replace(",", "."));

		const hasImmediateUnit = !remainder.startsWith(" ");
		let unit = "";
		let label = remainder.trim();

		if (hasImmediateUnit && label.length > 0) {
			const firstSpace = label.indexOf(" ");
			if (firstSpace === -1) {
				unit = label;
				label = "";
			} else {
				unit = label.substring(0, firstSpace);
				label = label.substring(firstSpace + 1);
			}
		}

		const key = `${unit.toLowerCase()}||${label.toLowerCase()}`;

		if (map.has(key)) {
			const existing = map.get(key)!;
			existing.amount += amount;
			// We do NOT update the ID. We keep the ID of the first item
			// that created this group to ensure list stability.
		} else {
			// New group: store the ID of this current item
			map.set(key, { amount, unit, label, id: item.id });
		}
	});

	// Reconstruct the strings
	const mergedItems = Array.from(map.values()).map((entry) => {
		const formattedAmount = Number.isInteger(entry.amount)
			? entry.amount.toString()
			: entry.amount.toFixed(2).replace(".", ",");

		const spacing = entry.unit && entry.label ? " " : entry.label ? " " : "";

		return {
			id: entry.id, // Restore the unique ID
			title: `${formattedAmount}${entry.unit}${spacing}${entry.label}`.trim(),
		};
	});

	return [...mergedItems, ...unparseableItems];
};

// eslint-disable-next-line react-refresh/only-export-components
export const shoppingListReducer = (
	state: ShoppingList,
	action: ShoppingListAction,
): ShoppingList => {
	switch (action.type) {
		case "ADD_BULK_TODO": {
			const allItems = [...state.todo, ...action.payload];
			const mergedList = consolidateList(allItems);

			return {
				...state,
				todo: mergedList,
			};
		}

		case "MOVE_TODO_TO_DONE":
			return {
				...state,
				todo: filterItem(state.todo, action.payload),
				done: [...state.done, action.payload],
			};

		case "MOVE_DONE_TO_TODO":
			return {
				...state,
				done: filterItem(state.done, action.payload),
				todo: [...state.todo, action.payload],
			};

		case "CLEAR_DONE":
			return {
				...state,
				done: [],
			};

		default:
			return state;
	}
};

const STORAGE_KEY = "shoppingListState";

const getInitialState = (defaultState: ShoppingList): ShoppingList => {
	try {
		const storedState = localStorage.getItem(STORAGE_KEY);
		if (storedState) {
			return JSON.parse(storedState) as ShoppingList;
		}
	} catch (error) {
		console.error("Failed to parse state from localStorage", error);
	}
	return defaultState;
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePersistentShoppingList = (
	defaultState: ShoppingList,
): [ShoppingList, React.Dispatch<ShoppingListAction>] => {
	const [state, dispatch] = useReducer(
		shoppingListReducer,
		defaultState,
		getInitialState,
	);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch (error) {
			console.error("Failed to save state to localStorage", error);
		}
	}, [state]);

	return [state, dispatch];
};

type ShoppingListContextType = {
	state: ShoppingList;
	// Allow passing partial items (without ID) for convenience in UI
	bulkAdd: (items: Array<{ title: string; id?: string }>) => void;
	moveToDone: (item: ListItem) => void;
	moveToTodo: (item: ListItem) => void;
	clearDone: () => void;
};

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
	undefined,
);

type ShoppingListProviderProps = {
	children: ReactNode;
};

const initialShoppingList: ShoppingList = {
	todo: [],
	done: [],
};

export const ShoppingListProvider = ({
	children,
}: ShoppingListProviderProps) => {
	const [state, dispatch] = usePersistentShoppingList(initialShoppingList);

	// 3. Updated Context Logic: Ensures IDs exist
	const bulkAdd = (items: Array<{ title: string; id?: string }>) => {
		const itemsWithIds: ListItem[] = items.map((item) => ({
			title: item.title,
			id: item.id || generateId(),
		}));

		dispatch({ type: "ADD_BULK_TODO", payload: itemsWithIds });
	};

	const moveToDone = (item: ListItem) => {
		dispatch({ type: "MOVE_TODO_TO_DONE", payload: item });
	};

	const moveToTodo = (item: ListItem) => {
		dispatch({ type: "MOVE_DONE_TO_TODO", payload: item });
	};

	const clearDone = () => {
		dispatch({ type: "CLEAR_DONE" });
	};

	const contextValue = {
		state,
		bulkAdd,
		moveToDone,
		moveToTodo,
		clearDone,
	};

	return (
		<ShoppingListContext.Provider value={contextValue}>
			{children}
		</ShoppingListContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useShoppingList = (): ShoppingListContextType => {
	const context = useContext(ShoppingListContext);
	if (context === undefined) {
		throw new Error(
			"useShoppingList must be used within a ShoppingListProvider",
		);
	}
	return context;
};
