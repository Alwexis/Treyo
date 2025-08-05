import { defineStore } from "pinia";
import type { Task } from "../lib/types";
import { useBoardStore } from "./boards";

export const useCardStore = defineStore("card", {
  actions: {
    addTask(boardId: string, cardId: string, task: Task) {
      const boardStore = useBoardStore();
      const board = boardStore.getBoardById(boardId);
      if (!board) return;

      const card = board.cards.find((c) => c.id === cardId);
      if (!card) return;

      card.tasks.push(task);
      boardStore.saveToStorage();
    },

    updateTask(
      boardId: string,
      cardId: string,
      index: number,
      partial: Partial<Task>
    ) {
      const boardStore = useBoardStore();
      const board = boardStore.getBoardById(boardId);
      if (!board) return;

      const card = board.cards.find((c) => c.id === cardId);
      if (!card || !card.tasks[index]) return;

      card.tasks[index] = { ...card.tasks[index], ...partial };
      boardStore.saveToStorage();
    },

    toggleTask(boardId: string, cardId: string, index: number) {
      const boardStore = useBoardStore();
      const board = boardStore.getBoardById(boardId);
      if (!board) return;

      const card = board.cards.find((c) => c.id === cardId);
      if (!card || !card.tasks[index]) return;

      card.tasks[index].completed = !card.tasks[index].completed;
      boardStore.saveToStorage();
    },

    removeTask(boardId: string, cardId: string, index: number) {
      const boardStore = useBoardStore();
      const board = boardStore.getBoardById(boardId);
      if (!board) return;

      const card = board.cards.find((c) => c.id === cardId);
      if (!card || !card.tasks[index]) return;

      card.tasks.splice(index, 1);
      boardStore.saveToStorage();
    },
  },
});
