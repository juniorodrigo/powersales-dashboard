<template>
	<div>logout</div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth"

definePageMeta({
	name: "Logout",
	alias: "/logout",
	title: "Logout"
})

onBeforeMount(() => {
	useAuthStore().setLogout()
	window.location.href = "/login" + window.location.search
})
</script>
