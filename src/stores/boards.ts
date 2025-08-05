import { defineStore } from "pinia";
import type { Board, Card } from "../lib/types";
import { generateUUID, formatDate, exportBoard } from "../lib/utils";

const _KEY_ = "boards";
const _ACTIVE_KEY_ = "active_board_id";

export const useBoardStore = defineStore("boards", {
  state: () => ({
    boards: [] as Board[],
    activeBoardId: "" as string,
  }),

  getters: {
    getBoardById: (state) => (id: string) =>
      state.boards.find((board) => board.id === id),

    activeBoard(state): Board | undefined {
      return state.boards.find((board) => board.id === state.activeBoardId);
    },

    activeBoardExportURL(): string | undefined {
      if (this.activeBoard) return exportBoard(this.activeBoard);
    },
  },

  actions: {
    load() {
      const stored = localStorage.getItem(_KEY_);
      const activeId = localStorage.getItem(_ACTIVE_KEY_);

      if (stored) {
        try {
          this.boards = JSON.parse(stored) as Board[];
        } catch (e) {
          console.error("Error cargando boards desde localStorage: ", e);
          this.boards = [];
        }
      }

      if (activeId) this.activeBoardId = activeId;
    },

    saveToStorage() {
      localStorage.setItem(_KEY_, JSON.stringify(this.boards));
    },

    setActiveBoard(id: string) {
      if (this.activeBoard?.id === id) return;
      this.activeBoardId = id;
      localStorage.setItem(_ACTIVE_KEY_, id);
    },

    create(title: string) {
      const newBoard: Board = {
        id: generateUUID(),
        title,
        cards: [],
        creation_date: formatDate(new Date()),
      };

      if (this.boards.length < 1) {
        this.setActiveBoard(newBoard.id);
      }

      this.boards.push(newBoard);
      this.saveToStorage();
    },

    delete(id: string) {
      this.boards = this.boards.filter((board) => board.id !== id);
      if (this.activeBoardId === id) {
        this.activeBoardId = "";
        localStorage.removeItem(_ACTIVE_KEY_);
      }
      this.saveToStorage();
    },

    addCard(boardId: string, card: Omit<Card, "id" | "tasks">) {
      const board = this.getBoardById(boardId);
      if (!board) return;

      const newCard: Card = {
        ...card,
        id: generateUUID(),
        tasks: [],
      };

      board.cards.push(newCard);
      this.saveToStorage();
    },

    updateCard(
      boardId: string,
      cardId: string,
      update: Partial<Omit<Card, "id">>
    ) {
      const board = this.getBoardById(boardId);
      if (!board) return;

      const idx = board.cards.findIndex((card) => card.id === cardId);
      if (idx === -1) return;
      const original = board.cards[idx];
      board.cards[idx] = {
        ...original,
        ...update,
        id: original.id,
      };
      this.saveToStorage();
    },

    updateBoard(id: string, updates: Partial<Board>) {
      const idx = this.boards.findIndex((b) => b.id === id);
      if (idx === -1) return;

      this.boards[idx] = { ...this.boards[idx], ...updates };
      this.saveToStorage();
    },

    import(board: unknown) {
      if (!board || typeof board !== 'object' || typeof (board as any).id !== 'string') {
        console.error('El archivo no es un Board válido')
        return
      }
      this.boards.push(board as Board)
      this.saveToStorage()
    },

    clear() {
      this.boards = [];
      this.activeBoardId = "";
      localStorage.removeItem(_KEY_);
      localStorage.removeItem(_ACTIVE_KEY_);
    },
  },
});
