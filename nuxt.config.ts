import { pagesExtend } from "./pages-extend"
import { pagesGenerateExclude } from "./pages-exclude"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		"@nuxtjs/i18n",
		"@nuxtjs/device",
		"nuxt-svgo",
		"@nuxtjs/tailwindcss",
		"@nuxt/test-utils/module"
	],
	app: {
		rootId: "app"
	},
	components: [
		{
			path: "~/components/cards",
			pathPrefix: false
		},
		{
			path: "~/components/common",
			pathPrefix: false
		}
	],
	svgo: {
		defaultImport: "component"
	},
	i18n: {
		vueI18n: "./i18n.config.ts"
	},
	build: {
		transpile:
			process.env.NODE_ENV === "production"
				? ["naive-ui", "vueuc", "@css-render/vue3-ssr", "@juggle/resize-observer"]
				: ["@juggle/resize-observer"]
	},
	vite: {
		vue: {
			script: {
				defineModel: true,
				propsDestructure: true
			}
		},
		optimizeDeps: {
			include:
				/*eslint no-mixed-spaces-and-tabs: "off"*/
				process.env.NODE_ENV === "development"
					? ["naive-ui", "vueuc", "date-fns-tz/formatInTimeZone", "fast-deep-equal", "@fawmi/vue-google-maps"]
					: ["fast-deep-equal", "@fawmi/vue-google-maps"]
		}
	},
	hooks: {
		"pages:extend": pages => pagesExtend(pages)
	},
	nitro: {
		prerender: {
			ignore: pagesGenerateExclude
		}
	}
})
