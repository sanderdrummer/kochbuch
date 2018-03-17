export interface Entry extends Object {
  id: string;
} 

export type CollectionState<T extends Entry> = {
  [key: string]: T
};

const ADD_ITEM = 'ADD_ITEM';
const SET = 'SET';
const RESET = 'RESET';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

export const types = {
  ADD_ITEM,
  SET,
  RESET,
  UPDATE_ITEM,
  DELETE_ITEM
};

export function createCollectionReducer<T extends Entry>(namespace: string) {
  return function collectionReducer(state: CollectionState<T> = {}, action: CollectionActions<T>) {
    switch (action.type) {
      case namespace + SET: return handleSet(<CollectionState<T>> action.payload);
      case namespace + RESET: return handleReset();
      case namespace + ADD_ITEM: return handleAdd(state, <T> action.payload);
      case namespace + UPDATE_ITEM: return handleUpdate(state, <T> action.payload);
      default: return state;
    }
  };
}

function handleReset() {
  return {};
}

function handleSet<T extends Entry>(newState: CollectionState<T>) {
  return {
    ...newState
  };
}

function handleAdd<T extends Entry>(state: CollectionState<T>, entry: T) {
  return {
    ...state,
    [entry.id]: entry
  };
}

function handleUpdate<T extends Entry>(state: CollectionState<T>, entry: Entry): CollectionState<T> {
  return {
    ...state,
    [entry.id]: {...Object(state[entry.id]), ...entry}
  };
}

export const collectionActions = {
  set<T extends Entry>(namespace: string, payload: CollectionState<T>) {
    return {
      type: namespace + SET,
      payload      
    };
  },
  reset(namespace: string) {
    return {
      type: namespace + RESET      
    };
  },
  addItem<T>(namespace: string, payload: T) {
    return {
      type: namespace + ADD_ITEM,
      payload
    };
  },
  updateItem<T extends Entry>(namespace: string, payload: T) {
    return {
      type: namespace + UPDATE_ITEM,
      payload
    };
  },
  removeItem(namespace: string, payload: string) {
    return {
      type: namespace + DELETE_ITEM,
      payload
    };
  }
};

export type CollectionActions<T extends Entry> = 
  { type: string, payload: CollectionState<T> } |  
  { type: string, payload: T } |  
  { type: string, payload: string };