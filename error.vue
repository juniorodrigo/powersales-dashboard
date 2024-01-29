<template>
	<div class="page page-wrapped flex items-center justify-center">
		<n-result :status="`${status}` || '404'" :title="statusMessage" size="huge" v-if="ready">
			<div class="flex justify-center">
				<n-button @click="redirect()">Go to home</n-button>
			</div>
		</n-result>
	</div>
</template>

<script lang="ts" setup>
import { NResult, NButton } from "naive-ui"
import { ref, toRefs } from "vue"

type Status = "500" | "error" | "info" | "success" | "warning" | "404" | "403" | "418"

const props = defineProps(["error"])
const { error } = toRefs(props)

const ready = ref(false)
const status = ref<Status>(error?.value.statusCode)
const statusMessage = computed(() => {
	if (error?.value && "statusMessage" in error.value) {
		return error.value.statusMessage
	}
	return "404 Not Found"
})

function redirect() {
	clearError({ redirect: "/" })
}

onMounted(() => {
	ready.value = true
})
</script>

<style lang="scss" scoped>
.page {
	font-size: 300px;
	height: 100vh;
	height: 100svh;
}
</style>
