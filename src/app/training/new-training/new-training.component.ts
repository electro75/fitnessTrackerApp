import { Component, OnInit, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../training.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  trainings: Exercise[] = [];

  constructor(private trainingService: TrainingService, private __store: AngularFirestore) {

   }

  ngOnInit() {
    this.trainings = this.trainingService.getAvailableTrainings();
    this.__store
      .collection('availableExercises')
      .valueChanges()
      .subscribe(res => {
        console.log(res);
    })
  }

  onStartTraining(form : NgForm) {
    this.trainingService.startExerc(form.value.exercise);
  }

}
