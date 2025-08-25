import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'  //React 18 pachinu API chhe.
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'    //React Router nu component chhe.

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* App ne Routing capability ape chhe */}
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </StrictMode>,
)
