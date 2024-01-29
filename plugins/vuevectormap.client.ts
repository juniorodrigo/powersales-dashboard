// @ts-ignore
import VueVectorMap from "vuevectormap"
import "vuevectormap/src/scss/vuevectormap.scss"
// Import your preferred map
import "jsvectormap/dist/maps/world-merc"

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.use(VueVectorMap)
})
