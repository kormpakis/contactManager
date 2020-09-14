import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store, persistedStore} from "./redux/store";
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
