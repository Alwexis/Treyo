<template>
    <router-view />
</template>

<script setup>
import { useBoardStore } from './stores/boards';

const boardStore = useBoardStore()
boardStore.load();
</script>
