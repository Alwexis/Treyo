<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { useBoardStore } from "../../stores/boards";
import type { Card } from "../../lib/types";

const boardStore = useBoardStore();

const data = reactive({ title: "", description: "", tags: "" })
const errors = reactive({ title: "" })

watchEffect(() => {
    errors.title = data.title.trim().length < 3 ? "El título debe de tener 4 carácteres o más." : ""
});

const emit = defineEmits<{
    (e: 'close'): void
}>();

const handleCreation = () => {
    if (!boardStore.activeBoard) return;
    const card: Omit<Card, 'id' | 'tasks'> = {
        title: data.title,
        description: data.description,
        tags: data.tags.split(' ')
    }
    boardStore.addCard(boardStore.activeBoard.id, card)
    emit('close')
}
</script>

<template>
    <div class="flex flex-col">
        <label for="title">
            <span class="text-red-400 mr-1">*</span>
            <span>Título de la tarjeta</span>
        </label>
        <input
            v-model="data.title"
            placeholder="Tareas pendientes"
            name="title"
            id="title"
            type="text"
            aria-label="Título de la Tarjeta"
            aria-describedby="title-error"
            class="mt-2 bg-white/50 dark:bg-black/25 transition-all duration-150 focus:ring focus:ring-neutral-700 focus:dark:ring-neutral-300 px-2 py-1 rounded-xs outline-none"
        />
        <span id="title-error" v-if="errors.title.length > 0" class="mt-1 text-sm font-thin text-red-400 dark:text-red-500">
            {{ errors.title }}
        </span>
    </div>
    <div class="flex flex-col my-2">
        <label for="description">Descripción de la tarjeta</label>
        <textarea
            v-model="data.description"
            placeholder="Este es un proyecto... para... y..."
            name="description"
            id="description"
            aria-label="Descripción de la tarjeta"
            class="mt-2 bg-white/50 dark:bg-black/25 transition-all duration-150 focus:ring focus:ring-neutral-700 focus:dark:ring-neutral-300 px-2 py-1 rounded-xs outline-none"
        />
    </div>
    <div class="flex flex-col">
        <label for="tags">Tags de la tarjeta</label>
        <input
            v-model="data.tags"
            placeholder="Este es un proyecto... para... y..."
            name="tags"
            type="text"
            id="tags"
            aria-label="Descripción del Tablero"
            class="mt-2 bg-white/50 dark:bg-black/25 transition-all duration-150 focus:ring focus:ring-neutral-700 focus:dark:ring-neutral-300 px-2 py-1 rounded-xs outline-none"
        />
        <span class="font-thin mt-2 text-sm text-neutral-600 dark:text-neutral-400">Los tags deben de estar separados por espacio.</span>
    </div>
    <footer class="w-full flex items-center justify-between mt-4">
        <button @click="$emit('close')" title="Cancelar creación de la tarjeta" type="button" class="w-40 transition-colors duration-200 bg-red-600 hover:bg-red-400 text-white py-1.5 rounded-sm cursor-pointer disabled:cursor-not-allowed">
            Cancelar
        </button>
        <button @click="handleCreation" :disabled="errors.title !== ''" title="Confirmar creación de la tarjeta" type="button" class="w-40 transition-colors duration-200 bg-blue-500 disabled:bg-blue-400 hover:bg-blue-400 text-white py-1.5 rounded-sm cursor-pointer disabled:cursor-not-allowed">
            Confirmar
        </button>
    </footer>
</template>