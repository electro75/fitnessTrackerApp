import { Exercise } from "./training.model";

export class TrainingService {
    availableExercise : Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, caloriesBurned: 8 },
        { id: 'pushups', name: 'Pushups', duration: 20, caloriesBurned: 20},
        { id: 'lunges', name: 'Lunges', duration: 25, caloriesBurned: 18  },
        { id: 'plank', name: 'Plank', duration: 60, caloriesBurned: 30 }
    ];
}