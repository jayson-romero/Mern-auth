import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthContextProvider} from './context/AuthContext'
import { LocalStorageProvider} from './utils/LocalStorage'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <LocalStorageProvider>
        <AuthContextProvider>
       
          <App />
        
        </AuthContextProvider>
      </LocalStorageProvider>
  </React.StrictMode>,
)
