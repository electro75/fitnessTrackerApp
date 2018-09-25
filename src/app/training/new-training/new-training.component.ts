import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../training.model';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  trainings : Exercise[];
  private trainingSubscription: Subscription;
  private loadSub: Subscription;
  isLoading: Boolean = true;
  constructor(private trainingService: TrainingService,
              private uiService: UIService) {

   }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.loadSub = this.uiService.loadingStateChanged
                        .subscribe(res => this.isLoading = res);

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
    this.trainingSubscription.unsubscribe();
    this.loadSub.unsubscribe();
  }

}
