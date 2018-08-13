export interface Exercise {
    id: String;
    name: String;
    duration: Number;
    caloriesBurned: Number;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
}