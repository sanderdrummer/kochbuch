import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

type UseLocalStorageStateResult<T> = [T, Dispatch<SetStateAction<T>>];

/**
 * A custom React hook that syncs state with window.localStorage.
 */
function useLocalStorageState<T>(
	key: string,
	initialValue: T,
): UseLocalStorageStateResult<T> {
	const readStorage = (): T => {
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	};

	const [storedValue, setStoredValue] = useState<T>(readStorage);

	useEffect(() => {
		// Check if window is defined
		if (typeof window === "undefined") {
			return;
		}

		try {
			// Save state to localStorage
			window.localStorage.setItem(key, JSON.stringify(storedValue));
		} catch (error) {
			// Handle potential errors, e.g., "quota exceeded"
			console.warn(`Error setting localStorage key "${key}":`, error);
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue];
}

export default useLocalStorageState;
