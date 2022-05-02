import React from "react";
import Profile from '../User/Profile';
import Reservation from '../User/Reservation';
import { Routes } from "react-router-dom";

const routes = [
  {path:'/user', exact:true, name: 'User' },
  {path:'/user/profile', exact:true, name: 'Profile', element: <Profile /> },
  {path:'/user/reservation', exact:true, name: 'Reservation', element: <Reservation /> },
];

export default Routes;