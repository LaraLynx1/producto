import './components/mainPage/mainPagePadre';
import './components/profilePage/profilePadre';
import './screens/exportscreens';
import dashboard from './screens/dashboard';
import styles from './abuelo.css';
import { AppState } from './types/appStateAction';
import { addObserver, appState } from './store/appState';
import { LoginComponent } from './components/LoginPage/Login';
import './components/LoginPage/LoginPadre';
import { LOGIN } from './screens/exportscreens';
import { PANTALLAS } from './types/enumeraciones';
import { Perfil } from './screens/exportscreens';
import { SIGNUP } from './screens/exportscreens';
import { ModificarProducto } from './components/indexPadre';

class appContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			//Limpiar shadow
			this.shadowRoot.innerHTML = '';

			console.log('Render de Abulo');

			//Cargar los lestilos
			const csscardfollow = this.ownerDocument.createElement('style');
			csscardfollow.innerHTML = styles;
			this.shadowRoot?.appendChild(csscardfollow);

			//Seleccion de la pagina a mostrar
			switch (appState.screen) {
				case PANTALLAS.DASHBOARD:
					const pantallaprincipal = this.ownerDocument.createElement('create-dashbard') as dashboard;
					this.shadowRoot.appendChild(pantallaprincipal);
					break;

				case PANTALLAS.MODIFICARPRODUCTO:
					const modificarProducto = this.ownerDocument.createElement('modificar-producto') as ModificarProducto;
					modificarProducto.setAttribute('productoid', appState.productoid);
					this.shadowRoot.appendChild(modificarProducto);
					break;

				default:
					break;
			}
		}
	}
}

window.customElements.define('app-container', appContainer);
