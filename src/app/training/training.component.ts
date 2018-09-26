import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  onGoingTraining = false;
  exercSub: Subscription

  constructor(private trainingService: TrainingService) { 
    
  }

  ngOnInit() {
    this.exercSub = this.trainingService.exerciseChanged.subscribe(exercise =>{
      if(exercise) {
        this.onGoingTraining = true;
      }
      
    })
  }

  ngOnDestroy() {
    if(this.exercSub) {
      this.exercSub.unsubscribe();
    }
  }

  

}
