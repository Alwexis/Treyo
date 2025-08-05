<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";
import Board from "../components/Board.vue";
import { useBoardStore } from "../stores/boards";
// import { useCardStore } from "../stores/cards";

const boardStore = useBoardStore();
// const cardStore = useCardStore();
</script>

<template>
    <main class="relative flex overflow-hidden">
        <Sidebar :default-open="true" />
        
        <section v-if="boardStore.activeBoard"
            class="relative bg-neutral-50 text-black dark:bg-neutral-950 dark:text-white w-dvw h-dvh"
        >
            <header class="w-full bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white py-4 text-xl font-bold text-center shadow-sm">
                <h2>Tablero {{ boardStore.activeBoard.title }}</h2>
            </header>
            <Board />
        </section>
        <section class="flex items-center justify-center bg-neutral-50 text-black dark:bg-neutral-950 dark:text-white w-dvw h-dvh px-6 py-4" v-else>
            <h1 class="text-xl">No has seleccionado ningún tablero.</h1>
        </section>
    </main>
</template>
