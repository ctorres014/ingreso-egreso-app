import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducers';
// El ActionReducerMap
// Permite fusionar varios reducers en uno solo
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
}

// Define configuration global its Reducers
export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer
};
