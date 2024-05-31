export type Producto = {
	id: string;
	nombre: string;
	precio: number;
	cantidad: number;
};

export type ProductoDto = Omit<Producto, 'id'>;
