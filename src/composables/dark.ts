import { i18n } from '~/modules/i18n'

export const isDark = useDark()
const isAppearanceTransition = computed(() => {
  // @ts-expect-error: Transition API
  return document.startViewTransition && site.value.appearanceTransition
})
export const toggleDark = function (event?: MouseEvent) {
  if (!isAppearanceTransition || !event) {
    isDark.value = !isDark.value
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(() => {
    isDark.value = !isDark.value
  })
  transition.ready.then(() => {
    const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: !isDark.value ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 600,
        easing: 'ease-in',
        pseudoElement: !isDark.value ? '::view-transition-new(root)' : '::view-transition-old(root)',
      },
    )
  })
}
export const { t } = i18n.global
