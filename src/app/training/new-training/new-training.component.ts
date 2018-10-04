import { Component, OnInit, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../training.model';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/ui.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  trainings$ : Observable<Exercise[]>;
  private trainingSubscription: Subscription;
  private loadSub: Subscription;
  // isLoading: Boolean = true;
  isLoading$ : Observable<boolean>;
  constructor(private trainingService: TrainingService, private uiService: UIService,
              private __store: Store<fromTraining.State>) {

   }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.isLoading$ = this.__store.select(fromRoot.getIsLoading);

    this.trainings$ = this.__store.select(fromTraining.getAvailableExercises);

    this.trainingService.fetchAvailableTrainings()
  }

  onStartTraining(form : NgForm) {
    this.trainingService.startExerc(form.value.exercise);
  }

}
