import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

function Login(props) {

  const token = localStorage.getItem('auth_login_token');

  let navigate = useNavigate();
  const http = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
      'Accept': 'application/json',
      'Content': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true,
  });
  const [info, SetInfo] = useState({
    email: '',
    password: '',
    authError: '',
    validError: '',
  });
  
  
  function handleChange(e) {
    SetInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  }
  
  const [loading, setLoading] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    http.get('/sanctum/csrf-cookie')
      .then(res => {
        http.post(`/api/login`, info)
          .then(res => {
            if (res.data.token) {
              setLoading(false);
              localStorage.setItem('auth_login_token', res.data.token)
              localStorage.setItem('auth_login_user',JSON.stringify(res.data.user));
              localStorage.setItem('auth_reservation',JSON.stringify(res.data.reservation));
              navigate('/home')
            }
            else {
              SetInfo({
                ...info,
                validError: res.data,
                authError: res.data.error,
              })
            }
          })
      })
  }


  return (
    <div>
      
      <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <form className="w-full sm:max-w-md p-5 mx-auto" onSubmit={handleSubmit}>

          <h2 className="mb-12 text-center text-5xl text-blue-500 font-extrabold">Login.</h2>

          <span className='text-red-500'>{info.authError}</span>
          <div className="mb-4">
            <span className='text-red-500'>{info.validError.email}</span>
            <InputBox inputType='email' name='email' inputLabel='Email' onChange={handleChange} styleInput='py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full' />
          </div>

          <div className="mb-4">
            <span className='text-red-500'>{info.validError.password}</span>
            <InputBox inputType='password' name='password' inputLabel='Password' onChange={handleChange} styleInput='py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full' />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox"
                name='remember_me'
                className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
              <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
            </div>
          </div>

          <div className="mt-6">
            <button type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center underline">
            <NavLink to='/register'>Sign up for an account</NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login