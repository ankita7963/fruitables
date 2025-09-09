import { useState } from 'react'
//Routes: bdha Route components nu parent wrapper chhe., Route: ek individual route define kare chhe.
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import PrivateRoutes from './Routes/PrivateRoutes'
import MUIdemo from './Material_User_Interface/MUIdemo'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import createReduxStore from './redux/Store'
import { ThemeProvider } from './context/ThemeContext.jsx'

function App() {
  const { store, persistor } = createReduxStore();

  return (
    <ThemeProvider>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <Routes>

            {/* ---"/*" (wildcard chhe) – atle ke. bdhu UserRoutes component hendle kar chhe.--- */}
            <Route path="/*" element={<UserRoutes />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Route>

          </Routes>
        </PersistGate>

      </Provider>

    </ThemeProvider>

  )
}

export default App
