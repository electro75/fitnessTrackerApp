import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../training.model';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/ui.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  trainings : Exercise[];
  private trainingSubscription: Subscription;
  private loadSub: Subscription;
  // isLoading: Boolean = true;
  isLoading$ : Observable<boolean>;
  constructor(private trainingService: TrainingService, private uiService: UIService,
              private __store: Store<fromRoot.State>) {

   }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.isLoading$ = this.__store.select(fromRoot.getIsLoading);

    this.trainingSubscription = this.trainingService.exercisesChanged
                  .subscribe(res => {
                    this.trainings = res;
                  });

    this.trainingService.fetchAvailableTrainings()
  }

  onStartTraining(form : NgForm) {
    this.trainingService.startExerc(form.value.exercise);
  }

  ngOnDestroy() {
    if(this.trainingSubscription) {
      this.trainingSubscription.unsubscribe();
    }
  }

}
