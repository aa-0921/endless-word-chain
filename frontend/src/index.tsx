import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NotificationsProvider } from '@mantine/notifications';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <NotificationsProvider position="bottom-center"> */}
    <NotificationsProvider limit={5}>
      <App />
    </NotificationsProvider>
  </React.StrictMode>
);
