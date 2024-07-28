import React, { useContext, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { UserContext } from './context/UserContext';
import Login from './components/Login';
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import ProductRoutees from './Routes/ProductRoutees';
import AdminRoutes from './Routes/AdminRoutes';
import Navbar from './components/Navbar';
import NewNav from './NewComponents/NewNav';
import Upperfooter from './NewComponents/Upperfooter';
import Footer from './NewComponents/Footer';
import Rejistration from './NewComponents/Rejistration';


function App() {
  // Get the user context to determine the user's login status and role
  const user = useContext(UserContext);

  const [serch,setSerch]=useState(false);


  return (
    // Wrap the application with the Redux provider to enable Redux state management
    <Provider store={store}>
      <BrowserRouter>

        <NewNav serch={serch} setSerch={setSerch} />
        <Routes>
          {/* Check if the user is logged in */}
          {user.user ? <Route path='/*' element={user?.user?.role === "admin" ? <AdminRoutes /> : <ProductRoutees serch={serch} setSerch={setSerch}  />} /> : <Route path='/' element={<Rejistration />} />}

        </Routes>
        {user?.user?.role!=="admin" ? <Upperfooter/>:<></>}
        {user?.user?.role!=="admin" ? <Footer/>:<></>}

      </BrowserRouter>
      {/* Display toast notifications */}
      <Toaster />
    </Provider>
  );
}

export default App;
