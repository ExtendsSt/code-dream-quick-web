import useMyFetch from '~/utils/http/fetch'

export interface BasicResponseModel<T = any> {
  code: number
  message: string
  result: T
}

export interface BasicPageParams {
  pageNumber: number
  pageSize: number
  total: number
}

export function test() {
  return useMyFetch('/test')
}
