import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import {  Subscription} from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

import { DataSource } from '@angular/cdk/table';
import { Exercise } from '../training.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private exercChangedSub : Subscription;

  displayedColumns = ['name', 'duration', 'calories', 'status'];
  dataSource = new MatTableDataSource<Exercise>()

  constructor(private trainingService: TrainingService, private __store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.__store.select(fromTraining.getFinishedExercises).subscribe( exs => {
      this.dataSource.data = exs;
    })

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
