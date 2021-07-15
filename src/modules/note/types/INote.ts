export interface INote {
    room?: string,
    title: string;
    content: string;
    points: INotePoint[];
    id?: string;
    _id?: string;
    status: 'done' | 'inProgress' | 'new';
    priority: INotePriority;
    lastUpdate: number;
}

export type INotePoint = {
    text: string;
    isDone: boolean;
    uid: string;
}

export type INotePriority = 'low' | 'medium' | 'high';
