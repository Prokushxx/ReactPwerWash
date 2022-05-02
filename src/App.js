import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Service from "./Pages/Service";
import Home from "./Pages/Home";
import Appointment from "./Pages/User/Appointment";
import ClipLoader from "react-spinners/ClipLoader";

const identify = JSON.parse(localStorage.getItem('auth_login_user'));
const reservestorage = JSON.parse(localStorage.getItem('auth_reservation'));

function App() {
  const auth = localStorage.getItem('auth_login_token');
  window.user = identify ? identify : null
  window.reserve = identify ? reservestorage : null

  const [loading, setLoading] = useState(false)
  return (


    <Router >
      <div>
        {
          loading ?
            (
              <ClipLoader color={'#7989DB'} loading={loading} size={150} />
            )
            :
            <div>
              <NavBar />
              <Routes>
                <Route path='/login' element={auth ? (<Navigate to={'/home'} replace />) : (<Login />)} />

                <Route path='/register' element={auth ? (<Navigate to={'/home'} replace />) : (<Register />)} />

                <Route
                  path="/home"
                  exact
                  element={
                    <Home />
                  } />

                <Route
                  path="/appointment/:id"
                  exact
                  element={
                    <ProtectedUserRoutes>
                      <Appointment />
                    </ProtectedUserRoutes >
                  } />

                <Route path="/service" element={<Service />} />
              </Routes>
              <Footer />
            </div>
        }
      </div>
    </Router>
  );
}

export default App;

export const ProtectedUserRoutes = ({ children }) => {
  const auth = localStorage.getItem('auth_login_token');
  if (auth) {
    return children;
  }
  else {
    return <Navigate to='/login' />
  }
}
