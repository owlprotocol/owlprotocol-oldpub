import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { isClient } from './utils/isClient.js';
import { rootReducer } from './reducer.js';
import { rootSaga } from './saga.js';

/** @internal */
export const createStore = () => {
    //Enable redux-devtools support, tracing
    const reduxDevToolsExists = isClient() && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = reduxDevToolsExists
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 10 })
        : compose;
    const sagaMiddleware = createSagaMiddleware();
    const rootMiddleware = applyMiddleware(sagaMiddleware);

    const store = createReduxStore(rootReducer, composeEnhancers(rootMiddleware));
    sagaMiddleware.run(rootSaga);

    return store;
};

export type StoreType = ReturnType<typeof createStore>;
export type DispatchType = StoreType['dispatch'];
