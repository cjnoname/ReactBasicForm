import { createStore, applyMiddleware, compose, combineReducers, StoreEnhancer, Store, StoreEnhancerStoreCreator, ReducersMapObject } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { ApplicationState, reducers } from './store';
import { History } from 'history';
import { reducer as formReducer } from 'redux-form';

export default function configureStore(history?: History, initialState?: ApplicationState) {
  const windowIfDefined = typeof window === 'undefined' ? null : window as any;
  const devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => StoreEnhancer;

  const createStoreWithMiddleware = compose(
    history ? applyMiddleware(thunk, routerMiddleware(history)) : <S>(next: StoreEnhancerStoreCreator<S>) => next,
    devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next
  )(createStore) as any;

  const allReducers = buildRootReducer(reducers);
  const store = createStoreWithMiddleware(allReducers, initialState) as Store<ApplicationState>;
  return store;
}

function buildRootReducer(allReducers: ReducersMapObject) {
  return combineReducers<any>({ ...allReducers, routing: routerReducer, form: formReducer });
}
