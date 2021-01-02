export class DailyTask {
    _id?: string;
    pageNumber: number;
    chapterNumber: number;
    dueDate: string;
    isComplete: Boolean;
    userName: string;

    constructor(pageNumber: number, chapterNumber: number, dueDate: string, userName:string){
        this.pageNumber = pageNumber;
        this.chapterNumber = chapterNumber;
        this.dueDate = dueDate;
        this.userName = userName;
        this.isComplete = false;
        this._id = null;
    }
}