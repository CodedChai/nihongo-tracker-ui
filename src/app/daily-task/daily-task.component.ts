import { DailyTaskService } from './../daily-task.service';
import { Component, OnInit } from '@angular/core';
import { DailyTask } from './dailyTask';

@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.css']
})
export class DailyTaskComponent implements OnInit {

  constructor(private dailyTaskService: DailyTaskService) { }

  tasks: DailyTask[];

  getTasks(): void {
    this.dailyTaskService.getTasks().subscribe(task => this.tasks = task);
    console.log(this.tasks);
  }

  ngOnInit(): void {
    this.getTasks()
  }

}
