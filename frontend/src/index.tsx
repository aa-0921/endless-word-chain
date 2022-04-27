import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { NotificationsProvider } from '@mantine/notifications'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    {/* <NotificationsProvider position="bottom-center"> */}
    <NotificationsProvider limit={5}>
      <App />
    </NotificationsProvider>
  </React.StrictMode>
)
