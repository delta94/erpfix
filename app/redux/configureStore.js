import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import rootSaga from '../sagas';
import chat from './modules/chat';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(createReducer(),
    fromJS(initialState),
    compose(...enhancers),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
