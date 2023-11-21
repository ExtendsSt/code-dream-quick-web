export type VueApp = (app: any) => void
declare global {interface Window { [idx: string]: any }}
export type Recordable<T = any> = Record<string, T>
