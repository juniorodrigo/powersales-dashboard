import { authCheck } from "@/utils/auth"

export default defineNuxtRouteMiddleware(to => {
	return authCheck(to)
})
