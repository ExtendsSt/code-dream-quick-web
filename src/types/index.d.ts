export type VueApp = (app: any) => void
export interface AddP {
  [idx: string]: any
}
declare global {
  interface Window { [idx: string]: any }
}
declare type Recordable<T = any> = Record<string, T>
