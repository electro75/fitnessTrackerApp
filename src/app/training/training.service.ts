import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Exercise } from "./training.model";
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { UIService } from '../shared/ui.service';

import * as UI from '../shared/ui.actions';
// Since this a lazily loaded module, state is being imported
// from training reducer as that reducer extends the app reducer.
import * as fromTraining from './training.reducer';
import * as Training from './training.action';
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
                private store: Store<fromTraining.State>) {  }

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
                    this.store.dispatch(new Training.SetAvailableTrainings(exercises));
                    
                }, error => {
                    // this.uiService.loadingStateChanged.next(false);
                    this.store.dispatch(new UI.StopLoading());
                    this.uiService.showSnackbar('Sorry! Could not load data',null, 3000);
                }
            )
        )
            

    }

    startExerc(selectedId: string) {
        this.store.dispatch(new Training.StrartTraining(selectedId))
        
    }

    completeExerc() {
        this.store.select(fromTraining.getCurrentTraining)
            .pipe(take(1))
            .subscribe(ex => {
            this.sendDataToStore({
                ...ex, 
                date: new Date(),
                state: 'completed'});
            this.store.dispatch(new Training.StopTraining());
        })

        
    }

    cancelExerc(progress) {
        this.store.select(fromTraining.getCurrentTraining)
            .pipe(take(1))
            .subscribe((ex: any)=> {
            this.sendDataToStore({
                ...ex,
                date: new Date(),
                duration: ex.duration * (progress / 100),
                caloriesBurned: ex.caloriesBurned * (progress / 100),
                state: 'cancelled'});
            this.store.dispatch(new Training.StopTraining());
        })
        
    }

    fetchCompletedExercise() {
        this.__subsArray.push(
            this.__store
                .collection('finishedExercises')
                .valueChanges()
                .subscribe((exercises: Exercise[])=>{
                    this.store.dispatch(new Training.SetFinishedTrainings(exercises));
                }
            )
        )
        
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