import { useI18n } from "vue-i18n"
import { useLocalesStore } from "@/stores/i18n"

export function useStoreI18n() {
	const { t } = useI18n()

	return {
		initLocale: (): string => {
			const { locale } = useNuxtApp().$i18n
			locale.value = useLocalesStore().locale
			return useLocalesStore().locale
		},
		getAvailableLocales: (): string[] => {
			const { availableLocales } = useNuxtApp().$i18n
			return availableLocales
		},
		getLocale: (): string => {
			const { locale } = useNuxtApp().$i18n
			return locale.value
		},
		setLocale: (newLocale: string): string => {
			const { locale } = useNuxtApp().$i18n
			locale.value = newLocale
			useLocalesStore().setLocale(newLocale)
			return newLocale
		},
		t
	}
}
