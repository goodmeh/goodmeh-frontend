export type SafeOmit<T, K extends keyof T> = Omit<T, K>;

export type StateLike<T> = [T, (value: T) => void];
