<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import Card from "./Card.vue";
import Dialog from "./Dialog.vue";
import CreateCardDialog from "./dialogs/CreateCardDialog.vue";
import { useBoardStore } from "../stores/boards";
import { ref, shallowRef, type Component } from "vue";

const boardStore = useBoardStore();

const dialogOpen = ref<boolean>(false);
const dialogComponent = shallowRef<null | Component>(null);
const dialogProps = ref<Record<string, any>>({});
const dialogTitle = ref<string>("");

const openDialog = (component: Component, props: Record<string, any> = {}) => {
  dialogTitle.value = props.title || "";
  dialogComponent.value = component;
  const { title, ...rest } = props;
  dialogProps.value = rest;
  dialogOpen.value = true;
};

const closeDialog = () => {
  dialogOpen.value = false;
  dialogComponent.value = null;
  dialogProps.value = {};
  dialogTitle.value = "";
};
</script>

<template>
  <Dialog :open="dialogOpen" :title="dialogTitle" @close="closeDialog">
    <component
      :is="dialogComponent"
      v-bind="dialogProps"
      v-if="dialogComponent"
      @close="closeDialog"
    />
  </Dialog>

  <main class="h-full w-full px-6 py-4 overflow-y-hidden overflow-x-auto">
    <section
      v-if="boardStore.activeBoard && boardStore.activeBoard.cards.length > 0"
      class="animate-fade animate-duration-[200ms] flex items-start space-x-6"
    >
      <Card v-for="card of boardStore.activeBoard.cards" :card="card" />
      <button
        @click="openDialog(CreateCardDialog, { title: 'Crear un nuevo Tablero' })"
        type="button"
        aria-label="Crear nueva tarjeta"
        class="flex items-center justify-center space-x-2 cursor-pointer px-4 py-3 rounded-md border transition-colors duration-200 border-neutral-200 bg-neutral-100 hover:bg-neutral-200/40 hover:dark:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-800 w-fit text-black dark:text-white"
      >
        <Plus />
        <span class="font-semibold">Nueva Tarjeta</span>
      </button>
    </section>
    <section
      v-else
      class="flex flex-col items-center justify-center w-full h-full animate-fade animate-duration-[200ms]"
    >
      <h2 class="text-xl font-bold">No tienes ninguna Tarjeta</h2>
      <button
        @click="openDialog(CreateCardDialog, { title: 'Crear un nuevo Tablero' })"
        type="button"
        aria-label="Crear nueva tarjeta"
        class="mt-4 flex items-center justify-center w-fit space-x-2 cursor-pointer duration-200 transition-all text-white hover:bg-blue-500 hover:dark:bg-blue-400 bg-blue-600 dark:bg-blue-500 px-6 py-2 rounded-sm"
      >
        <Plus />
        <span class="font-semibold">Nueva Tarjeta</span>
      </button>
    </section>
  </main>
</template>
