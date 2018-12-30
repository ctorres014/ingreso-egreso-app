import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[UI Loading] Cargando...';
export const DESACTIVAR_LOADING = '[UI Loading] Fin de carga...';

export class ActivarLoadingAction implements Action {
    readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action {
    readonly type = DESACTIVAR_LOADING;
}

// This Actions are passed at Reducers for know to be valid.
export type acciones = ActivarLoadingAction | DesactivarLoadingAction;
