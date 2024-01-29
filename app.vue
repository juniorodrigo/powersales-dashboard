<template>
	<Provider>
		<!--
			<ClientOnly> IS FOR DEMO PURPOSE. YOU CAN REMOVE IT IN PRODUCTION
				
			IT IS REQUIRED FOR RANDOM DEMO DATA


			The page transition could create issues in Nuxt projects with current versions.
			There are methods to avoid these problems, and Pinx provides 2 of them.
			By default, Method A is used.

			Method A: involves pausing navigation until the page transition is considered complete.
			Method B: involves halting navigation until the page transition is considered complete.
			
			You can find Method A in the file /plugins/router-transition.client.ts
			You can find Method B in the file /middleware/route.global.ts
		-->
		<ClientOnly>
			<component :is="layoutComponent" :class="[`theme-${themeName}`, `layout-${layout}`, themeName]">
				<NuxtPage
					:transition="{
						name: `router-${routerTransition}`,
						mode: 'out-in',
						appear: true
					}"
					:key="forceRefresh"
					:class="[`theme-${themeName}`, `layout-${layout}`, themeName]"
				/>
			</component>

			<SplashScreen :loading="loading" />
			<SearchDialog v-if="isLogged" />
			<LayoutSettings />
		</ClientOnly>
	</Provider>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, type Component } from "vue"
import { useMainStore } from "@/stores/main"
import { useAuthStore } from "@/stores/auth"
import { useThemeStore } from "@/stores/theme"
import { useStoreI18n } from "@/composables/useStoreI18n"
import VerticalNav from "@/layouts/VerticalNav/index.vue"
import HorizontalNav from "@/layouts/HorizontalNav/index.vue"
import Blank from "@/layouts/Blank/index.vue"
import Provider from "@/layouts/common/Provider.vue"
import SplashScreen from "@/layouts/common/SplashScreen.vue"
import LayoutSettings from "@/components/common/LayoutSettings.vue"
import SearchDialog from "@/components/common/SearchDialog.vue"
import { Layout, RouterTransition, type ThemeName } from "@/types/theme.d"
import { type RouteLocationNormalized, useRoute, useRouter } from "vue-router"
import "@/assets/scss/index.scss"

useAddFonts()

const router = useRouter()
const loading = ref(true)

const layoutComponents = {
	VerticalNav,
	HorizontalNav,
	Blank
}

const forceLayout = ref<Layout | null>(null)
const forceRefresh = computed<number>(() => useMainStore().forceRefresh)
const layout = computed<Layout>(() => useThemeStore().layout)
const layoutComponent = computed<Component>(() => layoutComponents[forceLayout.value || layout.value])
const routerTransition = computed<RouterTransition>(() => useThemeStore().routerTransition)
const themeName = computed<ThemeName>(() => useThemeStore().themeName)
const isLogged = computed(() => useAuthStore().isLogged)

function checkForcedLayout(route: RouteLocationNormalized) {
	if (route.meta?.forceLayout) {
		forceLayout.value = route.meta.forceLayout
	} else {
		forceLayout.value = null
	}
}

router.beforeEach(route => {
	checkForcedLayout(route)
})

onBeforeMount(() => {
	const meta = document.createElement("meta")
	meta.name = "naive-ui-style"
	document.head.appendChild(meta)

	useStoreI18n().initLocale()

	checkForcedLayout(useRoute())

	setTimeout(() => {
		loading.value = false
	}, 500)
})
</script>
