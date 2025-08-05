import type { Board } from "./types";

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("session");
}

export function generateUUID(): string {
  return crypto.randomUUID();
}

export function formatDate(date: Date): string {
  return date.toISOString();
}

export function parseDate(iso: string): Date {
  return new Date(iso);
}

export function dateToHumanReadable(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function exportBoard(board: Board): string {
  const blob = new Blob([JSON.stringify(board, null, 2)], {
    type: "application/json",
  });
  return URL.createObjectURL(blob);
}

export function readJSONFromFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string)
        resolve(json)
        // validarlo como Board
      } catch (err) {
        reject(new Error('Archivo no es un JSON válido'))
      }
    };

    reader.onerror = () => {
        reject(new Error('Error leyendo el archivo'))
    };

    reader.readAsText(file);
  });
}
