<script setup lang="ts">
import { Check, CircleCheck, CircleX, Pencil, Plus, X } from "lucide-vue-next";
import type { Card, Task } from "../lib/types";
import { generateUUID } from "../lib/utils";
import { useCardStore } from "../stores/cards";
import { useBoardStore } from "../stores/boards";
import { useTaskCreation } from "../composables/useTaskCreation";
import { useTitleEdit } from "../composables/useTitleEdit";

const cardStore = useCardStore();
const boardStore = useBoardStore();

const props = defineProps<{ card: Card }>();

const {
  state: creatingCard,
  start: startCreation,
  cancel: cancelCreation,
  confirm: confirmCreation,
} = useTaskCreation((title: string) => {
  const task: Task = { id: generateUUID(), title, completed: false };
  cardStore.addTask(boardStore.activeBoardId, props.card.id, task);
});

const {
    state: modifyingCard,
    start: startModification,
    cancel: cancelModification,
    confirm: confirmModification,
} = useTitleEdit((title: string) => {
    if (!boardStore.activeBoardId) return;

    boardStore.updateCard(boardStore.activeBoardId, props.card.id, { title })
})

const toggleTaskCompletition = (index: number) => {
  const task = props.card.tasks[index];
  if (!task || !boardStore.activeBoardId) return;

  cardStore.updateTask(boardStore.activeBoardId, props.card.id, index, {
    completed: !task.completed,
  });
};
</script>

<template>
  <div
    class="px-2 py-2 min-w-64 max-w-64 rounded-md border border-neutral-200 dark:border-neutral-800 text-black dark:text-white"
  >
    <div v-if="modifyingCard.status" class="flex items-start justify-between">
      <input
        type="text"
        :placeholder="card.title"
        ref="modify-card-title"
        v-model.trim="modifyingCard.title"
        name="card-title"
        id="card-title"
        class="border-b border-b-neutral-300 dark:border-b-neutral-700 rounded-xs px-1 w-40 outline-none text-sm"
      />
      <div class="flex items-center space-x-1">
        <button
          @click="cancelModification"
          type="button"
          aria-label="Cancelar modificación de título de la carta"
          class="w-6 h-6 hover:bg-neutral-200/40 hover:dark:bg-neutral-800/40 cursor-pointer flex items-center justify-center rounded-xs transition-all duration-200"
        >
          <X class="w-5 h-5" />
        </button>
        <button
          :disabled="modifyingCard.title.length < 4"
          @click="confirmModification"
          type="button"
          aria-label="Confirmar modificación de título de la carta"
          class="w-6 h-6 disabled:cursor-not-allowed disabled:text-neutral-400 not-disabled:hover:bg-neutral-200/40 disabled:dark:text-neutral-400 not-disabled:hover:dark:bg-neutral-800/40 cursor-pointer flex items-center justify-center rounded-xs transition-all duration-200"
        >
          <Check class="w-5 h-5" />
        </button>
      </div>
    </div>
    <div v-else class="flex items-center group">
      <h3 class="mx-2 font-semibold cursor-default line-clamp-1">
        {{ card.title }}
      </h3>
      <button
        type="button"
        aria-label="Modificar título de la carta"
        @click="startModification"
        class="w-fit cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
      >
        <Pencil class="w-3.5" />
      </button>
    </div>
    <div class="my-2">
      <div
        role="button"
        :aria-label="`Tarea ${task.title}, presiónala para completarla o incompletarla.`"
        tabindex="0"
        v-for="(task, idx) of card.tasks"
        @click="toggleTaskCompletition(idx)"
        class="select-none w-full flex items-center cursor-pointer hover:bg-neutral-200/40 hover:dark:bg-neutral-800/40 transition-colors duration-200 px-2 h-8 rounded-sm"
      >
        <CircleCheck
          :class="`text-green-600 dark:text-green-300 overflow-hidden transition-all duration-300 ${
            task.completed ? 'w-4 max-w-4 opacity-100' : 'w-0 max-w-0 opacity-0'
          }`"
        />
        <CircleX
          :class="`text-red-600 dark:text-red-300 overflow-hidden transition-all duration-300 ${
            task.completed ? 'w-0 max-w-0 opacity-0' : 'w-4 max-w-4 opacity-100'
          }`"
        />
        <span :class="`ml-1.5 ${task.completed ? 'line-through' : ''}`">{{
          task.title
        }}</span>
      </div>
      <div
        v-if="creatingCard.status"
        class="animate-fade animate-duration-[400ms]"
      >
        <div class="flex items-start justify-between">
          <input
            ref="new-task-input"
            v-model.trim="creatingCard.title"
            placeholder="Título de la tarea"
            type="text"
            name="task-name"
            id="task-name"
            class="border-b border-b-neutral-300 dark:border-b-neutral-700 rounded-xs px-1 w-40 outline-none text-sm"
          />
          <div class="flex items-center space-x-1">
            <button
              @click="cancelCreation"
              type="button"
              aria-label="Cancelar creación de tarea"
              class="w-6 h-6 hover:bg-neutral-200/40 hover:dark:bg-neutral-800/40 cursor-pointer flex items-center justify-center rounded-xs transition-all duration-200"
            >
              <X class="w-5 h-5" />
            </button>
            <button
              :disabled="creatingCard.title.length < 4"
              @click="confirmCreation"
              type="button"
              aria-label="Confirmar creación de tarea"
              class="w-6 h-6 disabled:cursor-not-allowed disabled:text-neutral-400 not-disabled:hover:bg-neutral-200/40 disabled:dark:text-neutral-400 not-disabled:hover:dark:bg-neutral-800/40 cursor-pointer flex items-center justify-center rounded-xs transition-all duration-200"
            >
              <Check class="w-5 h-5" />
            </button>
          </div>
        </div>
        <span v-if="creatingCard.title.length < 4" class="text-red-400 text-xs"
          >El título debe tener más de 4 letras</span
        >
      </div>
    </div>
    <button
      @click="startCreation"
      type="button"
      aria-label="Agregar una nueva tarea"
      class="flex items-center cursor-pointer hover:bg-neutral-200/40 hover:dark:bg-neutral-800/40 transition-colors duration-200 w-full px-2 py-1 rounded-sm"
    >
      <Plus class="w-4 mr-2" />
      <span>Nueva tarea</span>
    </button>
  </div>
</template>
