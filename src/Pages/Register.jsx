import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register() {

  const navigate = useNavigate();
  const http = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
      'Content': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
  })

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    address: '',
    telephone: '',
    validError: [],
  });

  function handleChange(e) {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  }

  function submitRegister(e) {
    e.preventDefault();
    http.get('/sanctum/csrf-cookie').then(res => {
      http.post(`/api/register`, registerData)
      .then(res => {
        console.log(res.data);
        if(res.data.token){
            localStorage.setItem('auth_login_token',res.data.token)
            localStorage.setItem('auth_login_user_type',res.data.user_type)
            localStorage.setItem('auth_login_name',registerData.email)
            Swal.fire('Registration Complete');
            navigate('/home');
          }
          else{
            setRegisterData({
              ...registerData,
              validError : res.data
            });
          }
        }).catch(err => {console.log(err);})
    }).catch(err =>{console.log(err);})
  }


  return (
    <div>
      <div className="">
        <div className="w-screen h-screen bg-gray-50 flex justify-center items-center ease-in">
          <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-10 bg-whie rounded flex justify-center items-center flex-col shadow-m ">
              <p className="my-3 text-5xl font-extrabold text-blue-500">Sign Up</p>
              <form className="flex-col mt-15 space-y-2" onSubmit={submitRegister}>

                <div>
                  {/* <input type="text" placeholder="fullname"
                    className="mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" /> */}
                    <span className='text-red-500'> {registerData.validError.name} </span>
                  <InputBox
                    inputType='text'
                    name='name'
                    inputLabel='Fullname'
                    styleInput='mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none'
                    onChange={handleChange}
                  />
                </div>

                <div>
                  {/* <input type="text" placeholder="email"
                    className="mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" /> */}
                    <span className='text-red-500'> {registerData.validError.email} </span>
                  <InputBox
                    name='email'
                    inputType='email'
                    inputLabel='Email'
                    styleInput='mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none'
                    onChange={handleChange}
                  />
                </div>

                <div>
                  {/* <input type="text" placeholder="address" autocomplete="street-address"
                    className="mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" /> */}
                    <span className='text-red-500'> {registerData.validError.address} </span>
                  <InputBox
                    name='address'
                    inputType='text'
                    inputLabel='Address'
                    styleInput='mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none'
                    onChange={handleChange}
                  />
                </div>

                <div>
                  {/* <input type="number" placeholder="mobile"
                    className="mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" /> */}
                    <span className='text-red-500'> {registerData.validError.telephone} </span>
                  <InputBox
                    name='telephone'
                    inputType='number'
                    inputLabel='Phone #'
                    styleInput='mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none'
                    onChange={handleChange}
                  />
                </div>

                <div>
                  {/* <input type="password" placeholder="password" autocomplete="new-password"
                    className="mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" /> */}
                    <span className='text-red-500'> {registerData.validError.password} </span>
                  <InputBox
                    name='password'
                    inputType='password'
                    inputLabel='Password'
                    styleInput='mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none'
                    onChange={handleChange}
                  />
                </div>

                <div>
                  {/* <input type="password" placeholder="Confirm Password"
                    autocomplete="new-password"
                    className="mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" /> */}
                    <span className='text-red-500'> {registerData.validError.password_confirmation} </span>
                  <InputBox
                    name='password_confirmation'
                    inputType='password'
                    inputLabel='Confirm Password'
                    styleInput='mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none'
                    onChange={handleChange}
                  />
                </div>

                <button type="submit"
                  className="ml-10 justify-center bg-blue-600 py-1 px-2 text-white">Register</button>
                <button className="ml-10 justify-center  py-1 px-2 text-blue-500 underline"><NavLink
                  to="/login"> Already have an Account?</NavLink></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register