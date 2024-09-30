export interface IContext<T> {
  data: T
  setData: (data: T) => void
}
