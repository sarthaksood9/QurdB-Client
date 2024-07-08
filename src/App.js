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
  // Get the user context to determine the user's login status and role
  const user = useContext(UserContext);
  console.log(user);


  return (
    // Wrap the application with the Redux provider to enable Redux state management
    <Provider store={store}>
      <BrowserRouter>

        <Navbar />
        <Routes>
          {/* Check if the user is logged in */}
          {user.user ? <Route path='/*' element={user.user.role === "admin" ? <AdminRoutes /> : <ProductRoutees />} /> : <Route path='/' element={<Login />} />}

        </Routes>

      </BrowserRouter>
      {/* Display toast notifications */}
      <Toaster />
    </Provider>
  );
}

export default App;
