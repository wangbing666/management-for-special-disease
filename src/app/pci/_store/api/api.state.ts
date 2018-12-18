export interface IApiState<T> {
  readonly tab: number;
  readonly page: Array<number>;
  readonly data: T;
}
