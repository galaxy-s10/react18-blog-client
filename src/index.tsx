import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { NODE_ENV, outputStaticUrl } from 'script/utils/outputStaticUrl';

import './style/index.scss';

import App from './App';

import { store } from '@/stores';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <>
    <Provider store={store}>
      <BrowserRouter basename={outputStaticUrl(NODE_ENV === 'production')}>
        <App />
      </BrowserRouter>
    </Provider>
  </>
);
