import React from 'react';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';

import store from './store';
import history from './services/history';
import Routes from './routes';
import { Header } from './components/Header';
import GlobalStyled from './styles/GlobalStyled';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <HistoryRouter history={history}>
          <Header />
          <Routes />
          <GlobalStyled />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

        </HistoryRouter>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App;
