import { Action } from "@ngrx/store";
import { Exercise } from "./training.model";

export const SET_AVAILABLE_TRAININGS = '[TRAINING] Set Available Training';
export const SET_FINISHED_TRAININGS  = '[TRAINING] Set Finished Training';
export const START_TRAINING          = '[TRAINING] Start Training';
export const STOP_TRAINING           = '[TRAINING] Stop Training';

export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;

    constructor(public payload: Exercise[]) {  }
}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHED_TRAININGS;

    constructor(public payload: Exercise[]) {  }
}

export class StrartTraining implements Action {
    readonly type = START_TRAINING;

    constructor(public payload: string) {  }
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
}

export type TrainingActions =   SetAvailableTrainings   | 
                                SetFinishedTrainings    |
                                StrartTraining          |
                                StopTraining;