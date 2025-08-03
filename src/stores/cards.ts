import { defineStore } from 'pinia'
import type { Card, Task, TaskGroup } from '../lib/types'

export const useCardStore = defineStore('card', {
    state: () => ({
        selectedCard: null as Card | null,
    }),

    getters: {
        tasks: (state): Task[] =>
            state.selectedCard?.tasks.flatMap(g => g.tasks) ?? [],
    },

    actions: {
        setCard(card: Card) {
            this.selectedCard = structuredClone(card)
        },

        clearCard() {
            this.selectedCard = null
        },

        updateCard(partial: Partial<Card>) {
            if (!this.selectedCard) return
            this.selectedCard = { ...this.selectedCard, ...partial }
        },

        addTaskGroup(group: TaskGroup) {
            this.selectedCard?.tasks.push(group)
        },

        addTaskToGroup(groupIndex: number, task: Task) {
            this.selectedCard?.tasks[groupIndex]?.tasks.push(task)
        },

        toggleTask(groupIndex: number, taskIndex: number) {
            const task = this.selectedCard?.tasks[groupIndex]?.tasks[taskIndex]
            if (task) task.completed = !task.completed
        },

        removeTaskGroup(groupIndex: number) {
            this.selectedCard?.tasks.splice(groupIndex, 1)
        },

        removeTaskFromGroup(groupIndex: number, taskIndex: number) {
            this.selectedCard?.tasks[groupIndex]?.tasks.splice(taskIndex, 1)
        },

        updateTaskGroup(groupIndex: number, partial: Partial<TaskGroup>) {
            const group = this.selectedCard?.tasks[groupIndex]
            if (!group) return
            this.selectedCard!.tasks[groupIndex] = { ...group, ...partial }
        },

        updateTask(groupIndex: number, taskIndex: number, partial: Partial<Task>) {
            const task = this.selectedCard?.tasks[groupIndex]?.tasks[taskIndex]
            if (!task) return
            this.selectedCard!.tasks[groupIndex].tasks[taskIndex] = {
                ...task,
                ...partial
            }
        },
    }
})
