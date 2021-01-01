export interface DailyTask {
    _id: string;
    pageNumber: number;
    chapterNumber: number;
    dueDate: Date;
    isComplete: Boolean;
    userName: string;
}