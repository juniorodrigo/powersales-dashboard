<template>
	<n-form ref="formRef" :model="model" :rules="rules">
		<n-form-item path="email" label="Email">
			<n-input
				v-model:value="model.email"
				@keydown.enter="signIn"
				placeholder="micorreo@email.com"
				size="large"
				autocomplete="on"
			/>
		</n-form-item>
		<n-form-item path="password" label="Password">
			<n-input
				v-model:value="model.password"
				type="password"
				show-password-on="click"
				placeholder="Mínimo 8 caracteres"
				@keydown.enter="signIn"
				autocomplete="on"
				size="large"
			/>
		</n-form-item>
		<div class="flex flex-col items-end gap-6">
			<div class="flex justify-between w-full">
				<n-checkbox size="large">Recordarme</n-checkbox>
				<n-button text type="primary" @click="emit('forgot-password')">¿Olvidaste tu contraseña?</n-button>
			</div>
			<div class="w-full">
				<n-button type="primary" @click="signIn" class="!w-full" size="large">Iniciar sesión</n-button>
			</div>
		</div>
	</n-form>
</template>

<script lang="ts" setup>
import { ref } from "vue"

import {
	type FormInst,
	type FormValidationError,
	useMessage,
	type FormRules,
	NForm,
	NFormItem,
	NInput,
	NButton,
	NCheckbox
} from "naive-ui"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "vue-router"

interface ModelType {
	email: string | null
	password: string | null
}

const router = useRouter()
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const model = ref<ModelType>({
	email: "admin@admin.com",
	password: "password"
})

const emit = defineEmits<{
	(e: "forgot-password"): void
}>()

const rules: FormRules = {
	email: [
		{
			required: true,
			trigger: ["blur"],
			message: "Email is required"
		}
	],
	password: [
		{
			required: true,
			trigger: ["blur"],
			message: "Password is required"
		}
	]
}

function signIn(e: Event) {
	e.preventDefault()
	formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
		if (!errors) {
			if (model.value.email === "admin@admin.com" && model.value.password === "password") {
				useAuthStore().setLogged()
				router.push({ path: "/", replace: true })
			} else {
				message.error("Invalid credentials")
			}
		} else {
			message.error("Invalid credentials")
		}
	})
}
</script>
