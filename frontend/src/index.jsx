/* eslint-disable functional/no-expression-statement */
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './components/App.jsx';
import store, { persistor } from './store/index.js';

const root = ReactDOM.createRoot(document.querySelector('#chat'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
