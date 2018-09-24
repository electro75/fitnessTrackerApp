import { Subject } from 'rxjs/Subject';

import { Exercise } from "./training.model";
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercise : Exercise[] = [];
    private currentExerc;
    private exercises: Exercise[] = [];

    constructor(private __store: AngularFirestore) {  }

    fetchAvailableTrainings() {
        //new subscriptions replace the old ones, hence not polluting the memory of the app.
        this.__store
            .collection('availableExercises')
            .snapshotChanges()
            .map(docArray =>{
                return  docArray.map(doc => {
                    return { id: doc.payload.doc.id,  
                            name: doc.payload.doc.data().name,
                            caloriesBurned: doc.payload.doc.data().caloriesBurned,
                            duration: doc.payload.doc.data().duration }
                        })
                    })
            .subscribe((exercises: Exercise[]) => {
                this.availableExercise = exercises;
                this.exercisesChanged.next([...this.availableExercise]);
            })

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
        this.__store
            .collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[])=>{
                this.finishedExercisesChanged.next(exercises)
            })
    }

    getRunningExercise() {
        return {...this.currentExerc};
    }

    sendDataToStore(exercise: Exercise) {
        this.__store
            .collection('finishedExercises')
            .add(exercise)
    }
}