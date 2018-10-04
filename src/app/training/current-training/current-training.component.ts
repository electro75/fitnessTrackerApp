import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output()trainingExit = new EventEmitter<void>();

  progress = 0;
  timer;

  constructor(private dialog: MatDialog, private trainingService: TrainingService,
              private __store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.resumeTimer()
  }

  resumeTimer() {
    this.__store.select(fromTraining.getCurrentTraining)
                .pipe(take(1))
                .subscribe(ex => {
                  const step = ex.duration;

                  this.timer = setInterval(()=>{
                    this.progress += 5;
                    if(this.progress >= 100){
                      this.trainingService.completeExerc();
                      this.trainingExit.emit()
                      clearInterval(this.timer)
                    }
                  }, step )
                })
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
