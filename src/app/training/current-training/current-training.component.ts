import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output()trainingExit = new EventEmitter<void>();

  progress = 0;
  timer;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.resumeTimer()
  }

  resumeTimer() {
    const step = this.trainingService.getRunningExercise().duration;

    this.timer = setInterval(()=>{
      this.progress += 5;
      if(this.progress >= 100){
        this.trainingService.completeExerc();
        this.trainingExit.emit()
        clearInterval(this.timer)
      }
    }, step )
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent,{ data: { progress: this.progress }});
    
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.trainingService.cancelExerc(this.progress)
        this.trainingExit.emit()
      } else {
        this.resumeTimer();
      }
    })                                  
  }

}
