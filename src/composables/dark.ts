import { i18n } from '~/modules/i18n'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const { t } = i18n.global
