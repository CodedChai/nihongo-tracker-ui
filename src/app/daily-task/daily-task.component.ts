import { DailyTaskService } from './../daily-task.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DailyTask } from './dailyTask';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.css'],
  providers: [DatePipe]
})
export class DailyTaskComponent implements OnInit {

  constructor(private dailyTaskService: DailyTaskService, private datePipe: DatePipe,     private changeDetection: ChangeDetectorRef) { }

  tasks: DailyTask[];

  getTasks(): void {
    this.dailyTaskService.getTasks().subscribe(task => this.tasks = task);
    console.log(this.tasks);
  }

  ngOnInit(): void {
    this.getTasks()
  }

  addNewTask(chapterNumber: number, pageNumber: number, dueDate: Date): void {
    console.log(`add new task: chapter ${chapterNumber} page: ${pageNumber} date: ${dueDate}`);
    if (!chapterNumber || ! pageNumber || !dueDate) { return; }
    console.log(dueDate);

    let formattedDate = this.datePipe.transform(dueDate, 'yyyy-MM-dd');

    console.log(formattedDate);

    this.dailyTaskService.addNewTask(chapterNumber, pageNumber, formattedDate)
      .subscribe(newTask => {
        console.log(`new task: ${JSON.stringify(newTask)}`);
        this.tasks.push(newTask);
      });
  }

  updateTaskToComplete(index: number): void {

    let dailyTask = this.tasks[index];

    console.log(`update task to complete: id ${dailyTask._id} index ${index}`);

    if (!dailyTask) { return; }

    this.dailyTaskService.updateTaskToComplete(dailyTask)
      .subscribe(updatedTask => {
        console.log(`new task: ${JSON.stringify(updatedTask)}`);
        this.tasks[index] = updatedTask;
      });
  }
}
