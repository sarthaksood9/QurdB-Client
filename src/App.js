import React, { useContext } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { UserContext } from './context/UserContext';
import Login from './components/Login';
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import ProductRoutees from './Routes/ProductRoutees';
import AdminRoutes from './Routes/AdminRoutes';
import Navbar from './components/Navbar';


function App() {
  const user = useContext(UserContext);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {user.user ? <Route path='/*' element={user.user.post === "user" ? <AdminRoutes /> : <ProductRoutees />} /> : <Route path='/' element={<Login />} />}
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}


      <Toaster />
    </Provider>
  );
}

export default App;
