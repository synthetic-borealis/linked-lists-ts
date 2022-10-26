export type ForEachCallbackWithIndex<T> = (element: T, idx: number) => void;
export type ForEachCallbackWithoutIndex<T> = (element: T) => void;
export type ForEachCallback<T> = ForEachCallbackWithIndex<T> | ForEachCallbackWithoutIndex<T>;

export interface IIterable<T> {
  forEach(callback: ForEachCallback<T>): void;
}
