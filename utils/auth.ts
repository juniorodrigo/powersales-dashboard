import { useAuthStore } from "@/stores/auth"
import { type RouteMetaAuth } from "@/types/auth.d"
import { type RouteLocationNormalized } from "vue-router"

export function authCheck(route: RouteLocationNormalized) {
	const meta: RouteMetaAuth = route.meta
	const { checkAuth, authRedirect, auth, roles } = meta

	if (auth === true) {
		if (!useAuthStore().isLogged) {
			return navigateTo("/login")
		}

		if (roles && !useAuthStore().isRoleGranted(roles)) {
			return navigateTo("/login")
		}
	}

	if (checkAuth === true) {
		if (useAuthStore().isLogged) {
			if (roles) {
				if (useAuthStore().isRoleGranted(roles)) {
					return navigateTo(authRedirect || "/")
				} else {
					return navigateTo(route.path)
				}
			}
			return navigateTo(authRedirect || "/")
		}
	}
}
