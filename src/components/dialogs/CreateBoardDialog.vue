<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useBoardStore } from "../../stores/boards";

const boardStore = useBoardStore();

const title = ref("");
const error = ref("");

watchEffect(() => {
    error.value = title.value.trim().length < 3 ? "El título debe de tener 4 carácteres o más." : ""
});

const emit = defineEmits<{
    (e: 'close'): void
}>();

const handleCreation = () => {
    boardStore.create(title.value);
    emit('close')
}

</script>

<template>
    <div class="flex flex-col">
        <label for="title">Título del tablero</label>
        <input
            v-model="title"
            placeholder="Proyecto Moonie's Coffee Shop"
            name="title"
            id="title"
            type="text"
            aria-label="Título del Tablero"
            aria-describedby="title-error"
            class="mt-2 bg-white/50 dark:bg-black/25 transition-all duration-150 focus:ring focus:ring-neutral-700 focus:dark:ring-neutral-300 px-2 py-1 rounded-xs outline-none"
        />
        <span id="title-error" v-if="error.length > 0" class="mt-1 text-sm font-thin text-red-400 dark:text-red-500">
            {{ error }}
        </span>
    </div>
    <footer class="w-full flex items-center justify-between mt-4">
        <button @click="$emit('close')" title="Cancelar creación del tablero" type="button" class="w-40 transition-colors duration-200 bg-red-600 hover:bg-red-400 text-white py-1.5 rounded-sm cursor-pointer disabled:cursor-not-allowed">
            Cancelar
        </button>
        <button @click="handleCreation" :disabled="error !== ''" title="Confirmar creación del tablero" type="button" class="w-40 transition-colors duration-200 bg-blue-500 not-disabled:hover:bg-blue-400 text-white py-1.5 rounded-sm cursor-pointer disabled:cursor-not-allowed">
            Confirmar
        </button>
    </footer>
</template>
