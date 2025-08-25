import { useState } from 'react'
//Routes: bdha Route components nu parent wrapper chhe., Route: ek individual route define kare chhe.
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import PrivateRoutes from './Routes/PrivateRoutes'
import MUIdemo from './Material_User_Interface/MUIdemo'
import { Provider } from 'react-redux'
import { store } from './redux/Store'

function App() {

  return (

    <>
      <Provider store={store}>

        <Routes>

          {/* ---"/*" (wildcard chhe) – atle ke. bdhu UserRoutes component hendle kar chhe.--- */}
          <Route path="/*" element={<UserRoutes />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Route>

        </Routes>

      </Provider>

      {/* <br></br> */}
      {/* <MUIdemo /> */}
    </>


  )
}

export default App
