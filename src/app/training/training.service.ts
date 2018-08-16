import { Subject } from 'rxjs/Subject';

import { Exercise } from "./training.model";


export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    private availableExercise : Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, caloriesBurned: 8 },
        { id: 'pushups', name: 'Pushups', duration: 20, caloriesBurned: 20},
        { id: 'lunges', name: 'Lunges', duration: 25, caloriesBurned: 18  },
        { id: 'plank', name: 'Plank', duration: 60, caloriesBurned: 30 }
    ];

    private currentExerc: Exercise;

    getAvailableTrainings() {
        return this.availableExercise.slice();
    }

    startExerc(selectedId: String) {
        this.currentExerc = this.availableExercise.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.currentExerc});
        
    }
}