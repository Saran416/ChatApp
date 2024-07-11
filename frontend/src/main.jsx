import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from "./context/userContext.jsx"
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    
      <UserContextProvider>
        <App></App>
      </UserContextProvider>
    
  </BrowserRouter>,
)

{/* <React.StrictMode>
</React.StrictMode> */}