import '../components/mainPage/mainPagePadre';
import '../components/indexPadre';
import styles from '../dashboard.css';
import { Producto } from '../types/productos';
import { deleteProducto, getProductos } from '../services/firebase';
import PintarProducto, { atributos } from '../components/pintarProducto/pintarProducto';
import { dispatch } from '../store/appState';
import { cargarProductoState, modificarProducto } from '../types/appStateAction';

class dashboard extends HTMLElement {
	productos: Producto[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		/* const button = this.shadowRoot?.querySelector('#alogin');

		button?.addEventListener('click', () => {
			dispatch(navigate(PANTALLAS.LOGIN));
		});
		const button2 = this.shadowRoot?.querySelector('#asingup');

		button2?.addEventListener('click', () => {
			dispatch(navigate(PANTALLAS.SIGNUP));
		}); */

		this.productos = await getProductos();
		console.log('Total productos', this.productos.length);
		//dispatch(cargarProductoState(this.productos));
		this.render();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';

			const cssprofile = this.ownerDocument.createElement('style');
			cssprofile.innerHTML = styles;
			this.shadowRoot.appendChild(cssprofile);

			this.productos.forEach((producto: Producto) => {
				console.log('aqui', producto.nombre);

				const container = this.ownerDocument.createElement('section');

				const itemProducto = this.ownerDocument.createElement('pintar-producto') as PintarProducto;
				itemProducto.setAttribute(atributos.nombre, producto.nombre);
				itemProducto.setAttribute(atributos.precio, producto.precio.toString());
				itemProducto.setAttribute(atributos.cantidad, producto.cantidad.toString());

				const eliminar = this.ownerDocument.createElement('button');
				eliminar.innerText = 'Eliminar';
				eliminar.setAttribute('data-id', producto.id.toString());

				const modificar = this.ownerDocument.createElement('button');
				modificar.innerText = 'Modificar';
				modificar.setAttribute('data-id', producto.id.toString());

				eliminar.addEventListener('click', async (e: any) => {
					const id = e.target.getAttribute('data-id');
					console.log('eliminar', id);

					await deleteProducto(id);
					this.productos = await getProductos();

					this.render();
				});

				modificar.addEventListener('click', async (e: any) => {
					const id = e.target.getAttribute('data-id');
					console.log('modificar', id);

					//Llamar la acion para ir screen de modificar
					dispatch(modificarProducto(id));
				});
				container.appendChild(itemProducto);
				container.appendChild(modificar);
				container.appendChild(eliminar);
				this.shadowRoot?.appendChild(container);
			});
		}
	}
}

window.customElements.define('create-dashbard', dashboard);
export default dashboard;
