import Storage, { PersistanceKeys } from '../utils/storage';
import { AppState, Observer } from '../types/appStateAction';
import { reducer } from './reducer';
import { PANTALLAS } from '../types/enumeraciones';

const emptyState: AppState = {
	screen: PANTALLAS.DASHBOARD,
	productos: [],
	productoid: '',
};

export let appState = Storage.get<AppState>({
	key: PersistanceKeys.STORE,
	defaultValue: emptyState,
});

let observers: Observer[] = [];

const persistStore = (state: AppState) => Storage.set({ key: PersistanceKeys.STORE, value: state, session: false });
const persistDemo = (dato: string) => Storage.set({ key: PersistanceKeys.DATA, value: dato, session: true });

const notifyObservers = () => observers.forEach((o) => o.render());

export const dispatch = (action: any) => {
	console.log('Dispatching action', action);

	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;

	persistStore(newState);
	notifyObservers();
};

export const addObserver = (ref: Observer) => {
	observers = [...observers, ref];
};
