import { createFetch } from '@vueuse/core'

const useMyFetch = createFetch({
  baseUrl: import.meta.env.BASE_URL,
  options: {
    timeout: 10 * 1000,
    beforeFetch({ options }) {
      const { token } = useUserStore()
      options.headers = { token }
      return { options }
    },
    afterFetch(ctx) {
      return ctx
    },
    onFetchError(ctx) {
      return ctx
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

export default useMyFetch
