import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgresoModel } from './ingreso-egreso.model';

export interface IngresoEgresoState {
    items: IngresoEgresoModel[];
}

const estadoInicial: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer(state = estadoInicial, action: fromIngresoEgreso.acciones ): IngresoEgresoState {
    switch (action.type) {
        case fromIngresoEgreso.SET_ITEMS:
        // Vamos a regresar un nuevo estado
        // Eliminando las posibles referencias de valores
        // Por lo que regresamos un nuevo arreglo
            return { items: [
                // Mediante el operador map barremos todos los elementos
                // regresando un nuevo elemento y mendiante el operador expred
                // eliminamos la relacion interna de cada uno de los objetos en el arreglo
                // regresando un nuevo arreglo

                        ...action.items.map(item => {
                            return {
                                ...item
                            };
                        })
                    ]
            };
        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: []
            };
        default:
            return state;
    }
}