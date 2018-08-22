import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

export const App = ({ children, history, initialState }: { children: any, history?: any, initialState?: any }) => {
  const store = configureStore(history, initialState);
  return <Provider store={store}>{children}</Provider>;
};
