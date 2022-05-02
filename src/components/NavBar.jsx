
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { NavLink, useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');
function NavBar() {
  let token = localStorage.getItem('auth_login_token');
  const http = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
      'Accept': 'application/json',
      'Content': 'application/json',
      'X-Request-With': 'XMLRequest',
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });

  const [reserveData, setReserveData] = useState([])


  function getReservationData() {
    if (window.user) {
      setReserveData(window.reserve)
    }
  }
  // console.log(reserveData);

  useEffect(() => {
    getReservationData()
  }, [])

  const [openModal, setOpenModal] = useState(false);

  let AuthButton = '';
  let navigate = useNavigate();

  function logoutSubmit(e) {
    e.preventDefault();
    http.post(`/api/logout`)
      .then(res => {
        localStorage.removeItem('auth_login_token');
        localStorage.removeItem('auth_login_user');
        localStorage.removeItem('auth_reservation');
        if (!window.user) {
          navigate('/login')
          window.location.reload();
        }
      })
  }

  if (!token) {
    AuthButton = (
      <div className='flex'>
        <NavLink to='/login'>
          <button className="flex items-center mx-2 px-2 py-1 text-gray-800 hover:bg-indigo-600 rounded-md hover:text-white">
            Login
          </button>
        </NavLink>

        <NavLink to='/register'>
          <button className="flex items-center mx-2  px-2 py-1 text-gray-800 hover:bg-indigo-600 rounded-md hover:text-white">
            Register
          </button>
        </NavLink>
      </div>
    )
  }
  else {
    AuthButton = (
      <div className='flex'>

        <button
          onClick={(reserveData) => setOpenModal(true) }
          className="flex items-center mx-2 px-2 py-1 text-gray-800 hover:bg-indigo-600 rounded-md hover:text-white">
          Reservations
        </button>


        <NavLink to='/profile'>
          <button className="flex items-center mx-2  px-2 py-1 text-gray-800 hover:bg-indigo-600 rounded-md hover:text-white">
            Profile
          </button>
        </NavLink>

        <button className="flex items-center mx-2  px-2 py-1 text-gray-800 hover:bg-red-600 rounded-md hover:text-white"
          onClick={logoutSubmit}
        >
          Logout
        </button>
      </div>
    )
  }
  return (
    <div>
      <header className="bg-white shadow border-t-4 border-indigo-600">
        <div className="container mx-auto px-6 py-4 bg-white">
          <div className="flex items-center justify-between">

            <div className="flex items-center text-gray-800 hover:text-indigo-600" >
              <NavLink to="/home" >

                <span className="mx-3 font-medium text-sm md:text-base text-blue-700">Davie's Pressure
                  Washing</span>
              </NavLink>
            </div>

            <div className="flex items-center -mx-2">

              {AuthButton}
              <a href='#contact'>
                <button className="flex items-center mx-2  px-2 py-1 text-gray-800 hover:bg-indigo-600 rounded-md hover:text-white">
                  Contact
                </button>
              </a>

              <NavLink to='/service'>
                <button className="flex items-center mx-2  px-2 py-1 text-gray-800 hover:bg-indigo-600 rounded-md hover:text-white">
                  Services
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <Modal isOpen={openModal}>

          <div className="bg-white h-3/4 w-full">
            <div className="container">
              <table className="text-left w-full h-full">
                <thead className="bg-gray-500 flex text-white w-full">
                  <tr className="flex w-full mb-1">
                    <th className="p-4 w-1/4">Service</th>
                    <th className="p-4 w-1/4">Cost</th>
                    <th className="p-4 w-1/4">Requested Date</th>
                    <th className="p-4 w-1/4">Status</th>
                    <th className="p-4 w-1/4">Options</th>
                  </tr>
                </thead>
                <tbody
                  className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full"
                  style={{ height: '50vh' }}>
                  {reserveData.map((data) =>
                    <tr key={data.id} className="flex w-full border-b-2">
                      <td className="p-4 w-1/4">{data.date}</td>
                      <td className="p-4 w-1/4">{data.service.cost}</td>
                      <td className="p-4 w-1/4">
                        <p>Date:{data.reservation.date}</p><br />
                        <p>Time :{data.reservation.time}</p>
                      </td>
                      <td className="p-4 w-1/4"></td>
                      <td className="p-4">
                        <button className="px-2 py-1 bg-red-500 mt-2 text-white text-sm">Cancel</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="w-full mt-4 flex justify-center">
              <button onClick={() => setOpenModal(false)} className='px-2 py-1 bg-red-500 text-white rounded-md'> Close </button>
            </div>
          </div>
        </Modal>
      </header>
    </div>
  )
}

export default NavBar