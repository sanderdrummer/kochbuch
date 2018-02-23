export type Action<T> = {
    readonly type: string;
    payload: T
};