import { Provider as StoreProvider } from 'react-redux';

import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store, { persistor } from './store';

import './index.css';
import resources from './locales';

import App from './components/App.jsx';

const init = async () => {
  // i18next
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

  // rollbar
  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ErrorBoundary>
        </RollbarProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default init;
