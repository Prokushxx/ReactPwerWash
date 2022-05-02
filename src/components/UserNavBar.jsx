import React from 'react';
import { NavLink } from 'react-router-dom';

function UserNavBar() {
  return (
    <div>
      <header class="bg-white shadow border-t-4 border-indigo-600">
        <div class="container mx-auto px-6 py-4 bg-white">
          <div class="flex items-center justify-between">

            <div class="flex items-center text-gray-800 hover:text-indigo-600" >
              <NavLink to="/home" >

                <span class="mx-3 font-medium text-sm md:text-base text-blue-700">Davie's Pressure
                  Washing</span>
              </NavLink>
            </div>

            <div class="flex items-center -mx-2">
              <NavLink to='/reservation'>
                <button class="flex items-center mx-2 px-2 py-1 text-gray-800 hover:bg-indigo-600 rounded-md hover:text-white">
                  Reservations
                </button>
              </NavLink>

              <NavLink to='/contact'>
                <button class="flex items-center mx-2  px-2 py-1 text-gray-800 hover:bg-indigo-600 rounded-md hover:text-white">
                  Contact
                </button>
              </NavLink>

              <NavLink to='/service'>
                <button class="flex items-center mx-2  px-2 py-1 text-gray-800 hover:bg-indigo-600 rounded-md hover:text-white">
                  Services
                </button>
              </NavLink>

              <NavLink to='/profile'>
                <button class="flex items-center mx-2  px-2 py-1 text-gray-800 hover:bg-indigo-600 rounded-md hover:text-white">
                  Profile
                </button>
              </NavLink>

              <NavLink to='/login'>
                <button class="flex items-center mx-2  px-2 py-1 text-gray-800 hover:bg-indigo-600 rounded-md hover:text-white">
                  Logout
                </button>
              </NavLink>

            </div>
          </div>
        </div>

      </header>
    </div>
  )
}

export default UserNavBar