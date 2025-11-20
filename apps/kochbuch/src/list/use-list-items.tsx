import { createContext, type ReactNode, useContext, useEffect, useReducer } from "react";

export type ListItem = {
    title: string;
};

export type ShoppingList = {
    todo: ListItem[];
    done: ListItem[];
};

export type ShoppingListAction =
    | {
        type: 'ADD_BULK_TODO';
        payload: ListItem[];
    }
    | {
        type: 'MOVE_TODO_TO_DONE';
        payload: ListItem;
    }
    | {
        type: 'MOVE_DONE_TO_TODO';
        payload: ListItem;
    }
    | {
        type: 'CLEAR_DONE';
    };


const filterItem = (list: ListItem[], item: ListItem) =>
    list.filter((i) => i.title !== item.title);

// eslint-disable-next-line react-refresh/only-export-components
export const shoppingListReducer = (
    state: ShoppingList,
    action: ShoppingListAction
): ShoppingList => {
    switch (action.type) {
        case 'ADD_BULK_TODO':
            return {
                ...state,
                todo: [...state.todo, ...action.payload],
            };

        case 'MOVE_TODO_TO_DONE':
            return {
                ...state,
                todo: filterItem(state.todo, action.payload),
                done: [...state.done, action.payload],
            };

        case 'MOVE_DONE_TO_TODO':
            return {
                ...state,
                done: filterItem(state.done, action.payload),
                todo: [...state.todo, action.payload],
            };

        case 'CLEAR_DONE':
            return {
                ...state,
                done: [],
            };

        default:
            return state;
    }
};

const STORAGE_KEY = 'shoppingListState';

const getInitialState = (defaultState: ShoppingList): ShoppingList => {
    try {
        const storedState = localStorage.getItem(STORAGE_KEY);
        if (storedState) {
            return JSON.parse(storedState) as ShoppingList;
        }
    } catch (error) {
        console.error('Failed to parse state from localStorage', error);
    }
    return defaultState;
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePersistentShoppingList = (
    defaultState: ShoppingList
): [ShoppingList, React.Dispatch<ShoppingListAction>] => {

    const [state, dispatch] = useReducer(
        shoppingListReducer,
        defaultState,
        getInitialState
    );

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Failed to save state to localStorage', error);
        }
    }, [state]);

    return [state, dispatch];
};

type ShoppingListContextType = {
    state: ShoppingList;
    bulkAdd: (items: ListItem[]) => void;
    moveToDone: (item: ListItem) => void;
    moveToTodo: (item: ListItem) => void;
    clearDone: () => void;
};

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
    undefined
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


    const bulkAdd = (items: ListItem[]) => {
        dispatch({ type: 'ADD_BULK_TODO', payload: items });
    };

    const moveToDone = (item: ListItem) => {
        dispatch({ type: 'MOVE_TODO_TO_DONE', payload: item });
    };

    const moveToTodo = (item: ListItem) => {
        dispatch({ type: 'MOVE_DONE_TO_TODO', payload: item });
    };

    const clearDone = () => {
        dispatch({ type: 'CLEAR_DONE' });
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

export const useShoppingList = (): ShoppingListContextType => {
    const context = useContext(ShoppingListContext);
    if (context === undefined) {
        throw new Error(
            'useShoppingList must be used within a ShoppingListProvider'
        );
    }
    return context;
};
