import { AppState, SomeActions } from '../types/appStateAction';
import { PANTALLAS } from '../types/enumeraciones';

/* export const reducer = (currentAction: any, currentState: any): AppState => {
	return { screen: '' };
};  */

export const reducer = (currentAction: any, currentState: any) => {
	const { action, payload } = currentAction;

	switch (action) {
		case SomeActions.changescreen:
			currentState.screen = payload;
			break;
		case SomeActions.modificarProducto:
			currentState.screen = PANTALLAS.MODIFICARPRODUCTO;
			currentState.productoid = payload;
			break;
		case SomeActions.cargarProductoState:
			currentState.productos = payload;
			break;
	}

	return currentState;
};
