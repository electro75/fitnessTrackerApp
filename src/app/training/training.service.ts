import { Subject } from 'rxjs/Subject';

import { Exercise } from "./training.model";


export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    private availableExercise : Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 300, caloriesBurned: 8 },
        { id: 'pushups', name: 'Pushups', duration: 200, caloriesBurned: 20},
        { id: 'lunges', name: 'Lunges', duration: 250, caloriesBurned: 18  },
        { id: 'plank', name: 'Plank', duration: 600, caloriesBurned: 30 }
    ];

    private currentExerc;
    private exercises: Exercise[] = [];

    getAvailableTrainings() {
        return this.availableExercise.slice();
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