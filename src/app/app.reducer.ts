import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducers';
// import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducers';
// Permite fusionar varios reducers en uno solo
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    // ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

// Define configuration global its Reducers
export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    // ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
};
