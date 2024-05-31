import { navigate } from '../../types/appStateAction';
import { PANTALLAS } from '../../types/enumeraciones';
import styles from './pintarProducto.css';

export enum atributos {
	'nombre' = 'nombre',
	'precio' = 'precio',
	'cantidad' = 'cantidad',
}
class PintarProducto extends HTMLElement {
	nombre?: string = '';
	precio?: number = 0;
	cantidad?: number = 0;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const fijateEn: Record<atributos, null> = {
			nombre: null,
			precio: null,
			cantidad: null,
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
	connectedCallback() {
		//this.shadowRoot?.querySelector('form')?.addEventListener('submit', this.onSubmit.bind(this));

		/* const button = this.shadowRoot?.querySelector('#botonregreso');
		button?.addEventListener('click', () => {
			dispatch(navigate(PANTALLAS.LOGIN));
		}); */
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

			const nombreProducto = this.ownerDocument.createElement('h3');
			nombreProducto.innerText = this.nombre!;
			wrapper.appendChild(nombreProducto);

			const precioProducto = this.ownerDocument.createElement('h3');
			precioProducto.innerText = this.precio!.toString();
			wrapper.appendChild(precioProducto);

			const cantidadProducto = this.ownerDocument.createElement('h3');
			cantidadProducto.innerText = this.cantidad!.toString();
			wrapper.appendChild(cantidadProducto);

			this.shadowRoot.appendChild(wrapper);
		}
	}
}

window.customElements.define('pintar-producto', PintarProducto);
export default PintarProducto;
