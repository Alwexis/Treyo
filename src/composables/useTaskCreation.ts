import { onUnmounted, reactive, useTemplateRef } from "vue";

export function useTaskCreation(onConfirm: (title: string) => void) {
    const input = useTemplateRef<any>("new-task-input");
    const state = reactive({ status: false, title: "" })

    const start = () => {
        state.status = true
        document.addEventListener('keydown', handleKeyDown)
        setTimeout(() => input.value.focus(), 100)
    }

    const cancel = () => {
        state.status = false
        state.title = ""
        document.removeEventListener('keydown', handleKeyDown)
    }

    const confirm = () => {
        if (state.title.length < 4) return;
        onConfirm(state.title)
        cancel()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") confirm()
        if (e.key === "Escape") cancel()
    }

    onUnmounted(() => document.removeEventListener('keydown', handleKeyDown))

    return { input, state, start, cancel, confirm }
}