import { Producto } from './productos';

export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	productos: Producto[];
	productoid: string;
};

export enum SomeActions {
	'X' = 'X',
	'changescreen' = 'changescreen',
	'modificarProducto' = 'modificarProducto',
	'cargarProductoState' = 'cargarProductoState',
}

/* export interface XAction {
	action: SomeActions.X;
	payload: Pick<AppState, 'screen'>;
}

export type Actions = XAction; */

export const navigate = (screen: string) => {
	return {
		action: SomeActions.changescreen,
		payload: screen,
	};
};

export const modificarProducto = (productoid: string) => {
	console.log('Modificar producto', productoid);

	return {
		action: SomeActions.modificarProducto,
		payload: productoid,
	};
};

export const cargarProductoState = (productos: Producto[]) => {
	console.log('Modificar producto', productos.length);

	return {
		action: SomeActions.cargarProductoState,
		payload: productos,
	};
};
