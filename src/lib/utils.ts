export function isAuthenticated(): boolean {
    return !!localStorage.getItem('session')
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
    return new Date(iso).toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}