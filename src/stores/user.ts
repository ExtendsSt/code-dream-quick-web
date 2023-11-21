import { defineStore } from 'pinia'
import { StorageEnum } from '~/enums/storageEnum'
import { storage } from '~/utils/Storage'
import { test } from '~/apis/user'

interface UserState {
  username: string
  avatar: string
  permissions: string[]
}
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = reactive<UserState>({
    username: '',
    avatar: '',
    permissions: [],
  })

  function setToken(newVal: string) {
    storage.set(StorageEnum.ACCESS_TOKEN, newVal)
    token.value = newVal
  }

  function userLogin() {
    return test()
  }

  function userLogout() {
    storage.remove(StorageEnum.ACCESS_TOKEN)
  }

  return {
    token,
    ...toRefs(userInfo),
    setToken,
    userLogin,
    userLogout,
  }
})
