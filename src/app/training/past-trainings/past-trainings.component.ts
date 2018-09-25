import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {  Subscription} from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { Exercise } from '../training.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private exercChangedSub : Subscription;

  displayedColumns = ['name', 'duration', 'calories', 'status'];
  dataSource = new MatTableDataSource<Exercise>()

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercChangedSub = this.trainingService.finishedExercisesChanged
                                                .subscribe((exercises: Exercise[])=>{
                                                    this.dataSource.data = exercises;
                                                  })
    this.trainingService.fetchCompletedExercise();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.exercChangedSub.unsubscribe();
  }

}
