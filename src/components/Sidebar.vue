<script setup lang="ts">
import { computed, ref, shallowRef, type Component } from "vue";
import { useAuth } from "../composables/auth";
import { useBoardStore } from "../stores/boards";
import {
    Blocks,
    FileDown,
    FileUp,
    Grid2x2Plus,
    LayoutDashboard,
    LogOut,
    PanelRightClose,
    PanelRightOpen,
    X,
} from "lucide-vue-next";
import Dialog from "./Dialog.vue";
import CreateBoardDialog from "./dialogs/CreateBoardDialog.vue";
import DeleteBoardDialog from "./dialogs/DeleteBoardDialog.vue";

const { session, logOut } = useAuth();
const boardStore = useBoardStore();

const props = defineProps<{ defaultOpen: boolean }>();

const opened = ref<boolean>(props.defaultOpen);
const dialogOpen = ref<boolean>(false);
const dialogComponent = shallowRef<null | Component>(null);
const dialogProps = ref<Record<string, any>>({});
const dialogTitle = ref<string>("");

const boards = computed(() => boardStore.boards);

const classes = computed(() => ({
    "grid grid-rows-[auto_1fr_auto] h-dvh overflow-hidden transition-all duration-300 bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white py-4":
        true,
    "w-12 max-w-12 px-2": !opened.value,
    "w-56 max-w-56 px-4": opened.value,
}));

const openDialog = (component: Component, props: Record<string, any> = {}) => {
    dialogTitle.value = props.title || "";
    dialogComponent.value = component;
    const { title, ...rest } = props
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
                <div
                    class="w-full h-[1px] justify-self-center my-2 bg-neutral-300 dark:bg-neutral-700"
                ></div>
                <div class="text-sm">
                    <button
                        @click="
                            openDialog(CreateBoardDialog, {
                                title: 'Crear un nuevo Tablero',
                            })
                        "
                        class="flex items-center cursor-pointer transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-800 w-full h-10 px-2 rounded-sm"
                    >
                        <Grid2x2Plus class="w-5 mr-2" />
                        <span>Nuevo Tablero</span>
                    </button>
                    <a aria-label="Exportar tablero activo" :href="boardStore.activeBoardExportURL" :download="boardStore.activeBoard?.title">
                        <button :disabled="!boardStore.activeBoardExportURL"
                            class="disabled:text-neutral-400 flex items-center disabled:cursor-not-allowed not-disabled:cursor-pointer transition-colors not-disabled:hover:bg-neutral-200 not-disabled:hover:dark:bg-neutral-800 w-full h-10 px-2 rounded-sm"
                        >
                            <FileDown class="w-5 mr-2" />
                            <span>Exportar tablero</span>
                        </button>
                    </a>
                    <button
                        class="flex items-center cursor-pointer transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-800 w-full h-10 px-2 rounded-sm"
                    >
                        <FileUp class="w-5 mr-2" />
                        <span>Importar tablero</span>
                    </button>
                </div>
                <div
                    class="max-w-[80%] w-full h-[1px] justify-self-center my-2 bg-neutral-300 dark:bg-neutral-700"
                ></div>
            </section>
            <!-- Sidebar Body n Boards -->
            <section
                :class="{
                    'flex flex-col h-full mt-2': true,
                    'items-center justify-center': boards.length < 1,
                }"
            >
                <div v-if="boards.length < 1" class="text-center">
                    <h2 class="font-bold">No hay tableros</h2>
                    <p class="mt-1.5 text-sm">
                        ¿Por qué no creas o importas uno?
                    </p>
                </div>
                <!-- Improve it whenever I create the global state & board service -->
                <div v-else>
                    <div
                        class="flex items-center justify-between cursor-pointer transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-800 w-full h-10 px-2 rounded-sm"
                        v-for="board in boards"
                    >
                        <button class="flex items-center w-full cursor-pointer text-start" @click="boardStore.setActiveBoard(board.id)">
                            <LayoutDashboard class="w-4 mr-1.5" />
                            <h3 class="line-clamp-1 w-fit">{{ board.title }}</h3>
                        </button>

                        <button
                            @click="
                                openDialog(DeleteBoardDialog, {
                                    title: '¿Estás seguro?',
                                    board: board.id,
                                })
                            "
                            type="button"
                            aria-label="Delete board"
                            class="cursor-pointer hover:animate-spin hover:animate-once hover:animate-duration-[250ms] hover:animate-ease-in-out hover:dark:text-red-400 hover:text-red-500 transition-colors h-full w-6"
                        >
                            <X class="w-5" />
                        </button>
                    </div>
                </div>
            </section>
            <!-- Sidebar Footer -->
            <section>
                <div
                    class="max-w-[80%] w-full h-[1px] justify-self-center mt-2 mb-4 bg-neutral-300 dark:bg-neutral-700"
                ></div>
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
