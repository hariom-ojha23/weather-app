import React from 'react';
import Main from './assets/screen/Main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './assets/redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';

const { store, persistor } = ConfigureStore()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
