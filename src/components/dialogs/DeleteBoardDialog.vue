<script setup lang="ts">
import { useBoardStore } from "../../stores/boards";

const boardStore = useBoardStore();

const props = defineProps<{ board: string }>()

const emit = defineEmits<{
    (e: 'close'): void
}>();

const handleDeletion = () => {
    boardStore.delete(props.board);
    emit('close')
}

</script>

<template>
    <p>¿Estás seguro de querer eliminar el tablero? Esta acción es irreversible.</p>
    <footer class="w-full flex items-center justify-between mt-4">
        <button @click="$emit('close')" title="Cancelar eliminación del tablero" type="button" class="w-40 transition-colors duration-200 bg-blue-500 not-disabled:hover:bg-blue-400 text-white py-1.5 rounded-sm cursor-pointer disabled:cursor-not-allowed">
            Cancelar
        </button>
        <button @click="handleDeletion" title="Confirmar eliminación del tablero" type="button" class="w-40 transition-colors duration-200 bg-red-600 hover:bg-red-400 text-white py-1.5 rounded-sm cursor-pointer disabled:cursor-not-allowed">
            Confirmar
        </button>
    </footer>
</template>
