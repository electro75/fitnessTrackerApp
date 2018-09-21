import { Subject } from 'rxjs/Subject';

import { Exercise } from "./training.model";
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    private availableExercise : Exercise[] = [];

    private currentExerc;
    private exercises: Exercise[] = [];

    constructor(private __store: AngularFirestore) {  }

    fetchAvailableTrainings() {
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
                    this.exercises = exercises;
                    this.exercisesChanged.next([...this.exercises]);
                })

    }

    startExerc(selectedId: String) {
        this.currentExerc = this.availableExercise.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.currentExerc});
        
    }

    completeExerc() {
        this.exercises.push({...this.currentExerc, 
                            date: new Date(),
                            state: 'completed'});
        this.currentExerc = null;
        this.exerciseChanged.next(null);
    }

    cancelExerc(progress) {
        this.exercises.push({...this.currentExerc,
                            date: new Date(),
                            duration: this.currentExerc.duration * (progress / 100),
                            caloriesBurned: this.currentExerc.caloriesBurned * (progress / 100),
                            state: 'cancelled'});
        this.currentExerc = null;
        this.exerciseChanged.next(null);
    }

    getCompletedExercise() {
        return this.exercises.slice();
    }

    getRunningExercise() {
        return {...this.currentExerc};
    }
}