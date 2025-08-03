export interface Credentials {
    email: string;
    password: string;
}

export interface Sesion {
    email: string;
    username: string;
}

export interface Board {
    id: string;
    title: string;
    cards: Card[];
    creation_date: string; // ISO
}

export interface Card {
    id: string;
    title: string;
    description?: string;
    tags?: string[];
    tasks: TaskGroup[]
}

export interface TaskGroup {
    id: string
    title: string;
    description?: string;
    tasks: Task[]
}

export interface Task {
    id: string
    title: string;
    completed: boolean;
}