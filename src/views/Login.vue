<script setup lang="ts">
import { Eye, EyeClosed, Mail, RectangleEllipsis } from 'lucide-vue-next';
import { computed, reactive, ref, watchEffect } from 'vue';
import { useAuth } from '../composables/useAuth';
import type { Credentials } from '../lib/types';

const { logIn } = useAuth();

const credentials = reactive<Credentials>({ email: '', password: '' })
const seePwd = ref<boolean>(false)

const errors = reactive<{ email: string, password: string }>({ email: "", password: "" });

const seePwdButtonText = computed(() => {
    return seePwd ? "Ocultar contraseña" : "Mostrar contraseña";
})

const isFormValid = computed(() => errors.email.length === 0 && errors.password.length === 0)

const handleSubmit = () => {
    if (!isFormValid.value) return;
    
    logIn(credentials);
}

watchEffect(() => {
    errors.email = credentials.email.includes('@') ? '' : 'Ingresa un email válido'
    errors.password = credentials.password.length > 0 ? '' : 'Ingresa una contraseña válida'
})
</script>

<template>
    <main class="flex flex-col items-center justify-center bg-neutral-50 text-black dark:bg-neutral-950 dark:text-white w-dvw h-dvh">
        <h1 class="text-2xl">Iniciar Sesión</h1>
        <p class="pt-2 pb-4">Inicia sesión en Treyo, el clon de Trello por excelencia.</p>
        <form @submit.prevent="handleSubmit" class="space-y-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm w-md py-4 px-6">
            <div class="flex flex-col">
                <label for="email" class="flex items-end">
                    <Mail class="w-5" />
                    <span class="ml-1.5">Correo</span>
                </label>
                <input v-model="credentials.email" placeholder="moonie@cat.com" name="email" id="email" type="email" aria-label="Correo electrónico" aria-describedby="email-error" class="mt-2 bg-white/50 dark:bg-black/25 transition-all duration-150 focus:ring focus:ring-neutral-700 focus:dark:ring-neutral-300 px-2 py-1 rounded-xs outline-none">
                <span id="email-error" v-if="errors.email.length > 0" class="mt-1 text-sm font-thin text-red-400 dark:text-red-500">{{ errors.email }}</span>
            </div>
            <div class="flex flex-col">
                <label for="password" class="flex items-end">
                    <RectangleEllipsis class="w-5" />
                    <span class="ml-1.5">Contraseña</span>
                </label>
                <div class="grid grid-cols-[1fr_auto] items-center mt-2">
                    <input v-model="credentials.password" placeholder="******" name="password" id="password" aria-label="Contraseña" aria-describedby="password-error" :type="seePwd ? 'text' : 'password'" class="bg-white/50 dark:bg-black/25 transition-all duration-150 focus:ring focus:ring-neutral-700 focus:dark:ring-neutral-300 px-2 py-1 rounded-xs outline-none">
                    <button @click="seePwd = !seePwd" type="button" role="button" :aria-label="seePwdButtonText" :title="seePwdButtonText" :aria-pressed="seePwd" class="ml-4 px-2 py-1 h-fit cursor-pointer">
                        <EyeClosed class="w-5" v-if="!seePwd" />
                        <Eye class="w-5" v-else />
                    </button>
                    <span id="password-error" v-if="errors.password.length > 0" class="mt-1 text-sm font-thin text-red-400 dark:text-red-500">{{ errors.password }}</span>
                </div>
            </div>
            <button :disabled="!isFormValid" title="Iniciar sesión" type="submit" class="w-full mt-2 bg-blue-400 text-white py-2 rounded-sm cursor-pointer disabled:cursor-not-allowed">
                Iniciar sesión
            </button>
        </form>
    </main>
</template>