<script setup lang="ts">
import { X } from "lucide-vue-next";
import { onUnmounted, watch, ref, Teleport } from "vue";

const props = defineProps<{ open: boolean, title: string }>();

const emit = defineEmits<{ (e: "close"): void }>();

const isVisible = ref(false);
const isMounted = ref(false);

const onEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") emit("close");
};

watch(
    () => props.open,
    (val) => {
        if (val) {
            isMounted.value = true;
            requestAnimationFrame(() => {
                isVisible.value = true;
            });
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", onEscape);
        } else {
            isVisible.value = false;
            document.body.style.overflow = "";
            document.removeEventListener("keydown", onEscape);
            setTimeout(() => {
                isMounted.value = false;
            }, 200);
        }
    }
);

onUnmounted(() => {
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onEscape);
});
</script>

<template>
    <Teleport to="body">
        <div
            v-if="isMounted"
            class="fixed inset-0 z-50 flex items-center justify-center px-4 transition-all"
        >
            <!-- Backdrop -->
            <div
                class="absolute inset-0 bg-black/50 transition-opacity duration-200"
                :class="{
                    'opacity-100': isVisible,
                    'opacity-0 pointer-events-none': !isVisible,
                }"
                @click="$emit('close')"
            />

            <!-- Content -->
            <div
                role="dialog"
                aria-modal="true"
                class="relative z-10 w-full max-w-md bg-white dark:bg-neutral-900 text-black dark:text-white rounded-lg shadow-xl p-6 transition-all duration-200 transform"
                :class="{
                    'opacity-100 scale-100': isVisible,
                    'opacity-0 scale-95': !isVisible,
                }"
            >
                <header class="text-lg font-semibold mb-2 flex items-center justify-between w-full">
                    <h2>{{ props.title }}</h2>
                    <button class="cursor-pointer" type="button" aria-label="Cerrar dialog" @click="$emit('close')">
                        <X />
                    </button>
                </header>
                <slot />
            </div>
        </div>
    </Teleport>
</template>
