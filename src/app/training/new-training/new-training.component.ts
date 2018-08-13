import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../training.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output()startTraining = new EventEmitter<Boolean>();
  trainings: Exercise[] = [];

  constructor(private trainingService: TrainingService) {

   }

  ngOnInit() {
    this.trainings = this.trainingService.getAvailableTrainings();
  }

  onStartTraining() {
    this.startTraining.emit(true);
  }

}
