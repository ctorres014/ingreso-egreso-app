import * as fromUI from './ui.actions';

export interface State {
    isLoading: boolean;
}

// Define the state init
const initState: State = {
    isLoading: false
};

// Create Reducers
// Param stateinit and actions
export function uiReducer(state = initState, action: fromUI.acciones): State {
    switch (action.type) {
        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading: true
            };
            break;
        case fromUI.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };
            break;
        default:
            return state;
            break;
    }
}
