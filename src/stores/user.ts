import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const savedName = ref('')
  const isLoggedIn = ref<boolean>(false)
  const previousNames = ref(new Set<string>())

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name: string) {
    if (savedName.value)
      previousNames.value.add(savedName.value)

    savedName.value = name
  }
  function userLogin() {
    isLoggedIn.value = true
  }
  function userLogout() {
    isLoggedIn.value = false
  }

  return {
    otherNames,
    savedName,
    isLoggedIn,
    userLogin,
    userLogout,
    setNewName,
  }
})
