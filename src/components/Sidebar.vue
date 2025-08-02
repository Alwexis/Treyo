<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useAuth } from "../composables/auth";
import {
    Blocks,
    FileDown,
    FileUp,
    Grid2x2Plus,
    LogOut,
    PanelRightClose,
    PanelRightOpen,
    X,
} from "lucide-vue-next";
import type { Board } from "../lib/types";

const { session, logOut } = useAuth();

const props = defineProps<{ defaultOpen: boolean }>();

const opened = ref<boolean>(props.defaultOpen);
//! Pasarlo a estado global con Pinia
const boards = reactive<Board[]>([]);

const classes = computed(() => ({
    "absolute left-0 top-0 grid grid-rows-[auto_1fr_auto] h-full overflow-hidden transition-all duration-300 bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white py-4":
        true,
    "w-12 max-w-12 px-2": !opened.value,
    "w-56 max-w-56 px-4": opened.value,
}));
</script>

<template>
    <aside :class="classes">
        <button
            v-if="!opened"
            @click="opened = !opened"
            type="button"
            class="w-8 h-8 rounded-md cursor-pointer transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-800"
            aria-label="Open sidebar"
        >
            <PanelRightClose class="w-5 justify-self-center" />
        </button>
        <template v-if="opened">
            <!-- Sidebar Header -->
            <section>
                <div class="flex items-center justify-between">
                    <Blocks class="w-5" />
                    <button
                        @click="opened = !opened"
                        type="button"
                        class="w-8 h-8 rounded-md cursor-pointer transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-800"
                        aria-label="Close sidebar"
                    >
                        <PanelRightOpen class="w-5 justify-self-center" />
                    </button>
                </div>
                <div class="w-full h-[1px] justify-self-center my-2 bg-neutral-300 dark:bg-neutral-700"></div>
                <div class="text-sm">
                    <button
                        class="flex items-center cursor-pointer transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-800 w-full h-10 px-2 rounded-sm"
                    >
                        <Grid2x2Plus class="w-5 mr-2" />
                        <span>Nuevo Tablero</span>
                    </button>
                    <button
                        class="flex items-center cursor-pointer transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-800 w-full h-10 px-2 rounded-sm"
                    >
                        <FileDown class="w-5 mr-2" />
                        <span>Exportar tablero</span>
                    </button>
                    <button
                        class="flex items-center cursor-pointer transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-800 w-full h-10 px-2 rounded-sm"
                    >
                        <FileUp class="w-5 mr-2" />
                        <span>Importar tablero</span>
                    </button>
                </div>
                <div class="max-w-[80%] w-full h-[1px] justify-self-center my-2 bg-neutral-300 dark:bg-neutral-700"></div>
            </section>
            <!-- Sidebar Body n Boards -->
            <section :class="{ 'flex flex-col h-full': true, 'items-center justify-center': boards.length < 1 }">
                <div v-if="boards.length < 1" class="text-center">
                    <h2 class="font-bold">No hay tableros</h2>
                    <p class="mt-1.5 text-sm">¿Por qué no creas o importas uno?</p>
                </div>
                <!-- Improve it whenever I create the global state & board service -->
                <div v-else>
                    <div v-for="board in boards">
                        <h3>{{ board.title }}</h3>

                        <button type="button" aria-label="Delete board">
                            <X />
                        </button>
                    </div>
                </div>
            </section>
            <!-- Sidebar Footer -->
            <section>
                <div class="max-w-[80%] w-full h-[1px] justify-self-center mt-2 mb-4 bg-neutral-300 dark:bg-neutral-700"></div>
                <div class="flex items-start">
                    <img
                        src="/no-pfp.webp"
                        class="w-10 h-10 object-contain aspect-square rounded-md mr-2"
                        :alt="`${session?.username}'s profile picture`"
                    />
                    <h3>{{ session?.username }}</h3>
                </div>
                <button
                    type="button"
                    @click="logOut"
                    class="flex items-center justify-center rounded-sm mt-2.5 text-sm cursor-pointer text-red-500 dark:text-red-300 hover:bg-red-500 hover:dark:bg-red-400 hover:text-white transition-colors w-full h-8"
                >
                    <LogOut class="w-4 h-4 mr-2" />
                    <span>Cerrar sesión</span>
                </button>
            </section>
        </template>
    </aside>
</template>
