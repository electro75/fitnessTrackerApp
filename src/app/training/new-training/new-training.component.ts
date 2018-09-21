import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../training.model';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  trainings : Exercise[];
  trainingSubscription: Subscription;
  constructor(private trainingService: TrainingService) {

   }

  ngOnInit() {
    this.trainingSubscription =   this.trainingService.exercisesChanged.subscribe(res => this.trainings = res);
    this.trainingService.fetchAvailableTrainings()
  }

  onStartTraining(form : NgForm) {
    this.trainingService.startExerc(form.value.exercise);
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
  }

}
