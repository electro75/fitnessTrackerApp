import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';

import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining$ = new Observable<boolean>();
  exercSub: Subscription

  constructor(private trainingService: TrainingService, private __store: Store<fromTraining.State>) { 
    
  }

  ngOnInit() {
    this.onGoingTraining$ = this.__store.select(fromTraining.getIsTraining);
  }

}
