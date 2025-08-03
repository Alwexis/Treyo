<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";
import { useBoardStore } from "../stores/boards";
// import { useCardStore } from "../stores/cards";

const boardStore = useBoardStore();
// const cardStore = useCardStore();
</script>

<template>
    <main class="relative flex">
        <Sidebar :default-open="true" />
        <section
            class="relative bg-neutral-50 text-black dark:bg-neutral-950 dark:text-white w-dvw h-dvh px-6 py-4"
        >
            <header class="absolute top-0 left-0 w-full bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white py-4 text-xl font-bold text-center shadow-sm">
                <h2>Tablero {{ boardStore.activeBoard?.title }}</h2>
            </header>
        </section>
    </main>
</template>
