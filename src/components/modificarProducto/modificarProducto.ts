import { getProductos, updateProducto } from '../../services/firebase';
import { appState, dispatch } from '../../store/appState';
import { navigate } from '../../types/appStateAction';
import { PANTALLAS } from '../../types/enumeraciones';
import { Producto } from '../../types/productos';
import styles from './modificarProducto.css';

export enum atributos {
	'nombre' = 'nombre',
	'precio' = 'precio',
	'cantidad' = 'cantidad',
	'productoid' = 'productoid',
}
class ModificarProducto extends HTMLElement {
	nombre?: string = '';
	precio?: number = 0;
	cantidad?: number = 0;
	productoid?: string = '';

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const fijateEn: Record<atributos, null> = {
			nombre: null,
			precio: null,
			cantidad: null,
			productoid: null,
		};
		return Object.keys(fijateEn);
	}
	attributeChangedCallback(attrName: atributos, oldVal: any, newVal: any) {
		switch (attrName) {
			case atributos.precio:
				this.precio = parseFloat(newVal);
				break;

			case atributos.cantidad:
				this.cantidad = parseFloat(newVal);
				break;

			default:
				this[attrName] = newVal;
				break;
		}
	}
	async connectedCallback() {
		//this.shadowRoot?.querySelector('form')?.addEventListener('submit', this.onSubmit.bind(this));

		/* const button = this.shadowRoot?.querySelector('#botonregreso');
		button?.addEventListener('click', () => {
			dispatch(navigate(PANTALLAS.LOGIN));
		}); */
		const productos: Producto[] = await getProductos();
		const productohallado = productos.find((producto) => producto.id.toString() == this.productoid!);
		console.log('modproduct', this.productoid, productos.length, productohallado);

		if (productohallado) {
			this.productoid = productohallado.id;
			this.nombre = productohallado.nombre;
			this.precio = productohallado.precio;
			this.cantidad = productohallado.cantidad;
		} else console.log('No se encontro el producto');

		this.render();
	}

	disconnectedCallback() {
		//this.shadowRoot?.querySelector('form')?.removeEventListener('submit', this.onSubmit.bind(this));
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';

			const cssprofile = this.ownerDocument.createElement('style');
			cssprofile.innerHTML = styles;
			this.shadowRoot.appendChild(cssprofile);

			const wrapper = this.ownerDocument.createElement('div');
			wrapper.className = 'wrapper';

			const nombreProducto = this.ownerDocument.createElement('input') as HTMLInputElement;
			nombreProducto.value = this.nombre!;
			nombreProducto.addEventListener('change', this.changeNombre.bind(this));
			wrapper.appendChild(nombreProducto);

			const precioProducto = this.ownerDocument.createElement('input') as HTMLInputElement;
			precioProducto.value = this.precio!.toString();
			wrapper.appendChild(precioProducto);

			const cantidadProducto = this.ownerDocument.createElement('input') as HTMLInputElement;
			cantidadProducto.value = this.cantidad!.toString();
			wrapper.appendChild(cantidadProducto);

			const salvar = this.ownerDocument.createElement('button');
			salvar.innerText = 'Guardar';
			salvar.addEventListener('click', () => {
				//salvar en firestore
				const productoUpdate: Producto = {
					id: this.productoid!,
					nombre: this.nombre!,
					precio: this.precio!,
					cantidad: this.cantidad!,
				};
				console.log('Antes de update', productoUpdate);

				updateProducto(productoUpdate);
				//rediregir a la pagian dasboard
				dispatch(navigate(PANTALLAS.DASHBOARD));
			});

			wrapper.appendChild(salvar);

			this.shadowRoot.appendChild(wrapper);
		}
	}

	changeNombre(e: any) {
		this.nombre = e?.target?.value;
	}
}

window.customElements.define('modificar-producto', ModificarProducto);
export default ModificarProducto;
