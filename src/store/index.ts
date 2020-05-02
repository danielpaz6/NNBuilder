import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { shapeReducer } from './shapes/reducers';
import { mouseReducer } from "./mouse/reducers";
import { toastsReducer } from "./toasts/reducers";
import { configReducer } from "./config/reducers";

const rootReducer = combineReducers({
	shapes: shapeReducer,
	mouse: mouseReducer,
	toasts: toastsReducer,
	config: configReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const middlewares = [thunkMiddleware];
	const middleWareEnhancer = applyMiddleware(...middlewares);

	const store = createStore(
		rootReducer,
		composeWithDevTools(middleWareEnhancer)
	);

	return store;
}
  