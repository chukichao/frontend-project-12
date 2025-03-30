/* eslint-disable functional/no-expression-statement */

import { Provider } from 'react-redux';

import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/index.js';

import './index.css';
import resources from './locales';

import App from './components/App.jsx';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};

export default init;
