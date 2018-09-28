import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from "./training.model";
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { UIService } from '../shared/ui.service';

import * as UI from '../shared/ui.actions';
import * as fromRoot from '../app.reducer';
import { Store }from '@ngrx/store';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    private __subsArray: Subscription[] = [];

    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercise : Exercise[] = [];
    private exercises: Exercise[] = [];

    private currentExerc;

    constructor(private __store: AngularFirestore, private uiService: UIService,
                private store: Store<fromRoot.State>) {  }

    fetchAvailableTrainings() {
        this.store.dispatch(new UI.StartLoading());
        // this.uiService.loadingStateChanged.next(true);
        //new subscriptions replace the old ones, hence not polluting the memory of the app.
        this.__subsArray.push(
            this.__store
                .collection('availableExercises')
                .snapshotChanges()
                .pipe(map(docArray =>{
                    return  docArray.map((doc: any) => {
                        return { id: doc.payload.doc.id,  
                                name: doc.payload.doc.data().name,
                                caloriesBurned: doc.payload.doc.data().caloriesBurned,
                                duration: doc.payload.doc.data().duration }
                            })
                        }))
                .subscribe((exercises: Exercise[]) => {
                    this.store.dispatch(new UI.StopLoading());
                    // this.uiService.loadingStateChanged.next(false);
                    this.availableExercise = exercises;
                    this.exercisesChanged.next([...this.availableExercise]);
                }, error => {
                    // this.uiService.loadingStateChanged.next(false);
                    this.store.dispatch(new UI.StopLoading());
                    this.uiService.showSnackbar('Sorry! Could not load data',null, 3000);
                }
            )
        )
            

    }

    startExerc(selectedId: String) {
        this.currentExerc = this.availableExercise.find(ex => ex.name === selectedId);
        this.exerciseChanged.next({...this.currentExerc});
        
    }

    completeExerc() {
        this.sendDataToStore({...this.currentExerc, 
                            date: new Date(),
                            state: 'completed'});
        this.currentExerc = null;
        this.exerciseChanged.next(null);
    }

    cancelExerc(progress) {
        this.sendDataToStore({...this.currentExerc,
                            date: new Date(),
                            duration: this.currentExerc.duration * (progress / 100),
                            caloriesBurned: this.currentExerc.caloriesBurned * (progress / 100),
                            state: 'cancelled'});
        this.currentExerc = null;
        this.exerciseChanged.next(null);
    }

    fetchCompletedExercise() {
        this.__subsArray.push(
            this.__store
                .collection('finishedExercises')
                .valueChanges()
                .subscribe((exercises: Exercise[])=>{
                    this.finishedExercisesChanged.next(exercises)
                }
            )
        )
        
    }

    getRunningExercise() {
        return {...this.currentExerc};
    }

    sendDataToStore(exercise: Exercise) {
        this.__store
            .collection('finishedExercises')
            .add(exercise)
    }

    cancelSubscriptions() {
        this.__subsArray.forEach(sub => sub.unsubscribe());
    }
}