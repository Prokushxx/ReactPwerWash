import React from 'react';
import Cards from '../components/Cards';

function Service() {
  return (
    <div className=''>
      <h1 className="text-2xl font-semibold text-blue-500 text-center mt-5">SERVICES WE OFFER</h1>

      <h5 className="font-semibold text-red-500 text-center mt-1">Please login before making a Reservation</h5>

      <div className="py-1 mb-4">
        <div className="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
          <div className="mx-auto grid gap-6 md:w-3/4 lg:w-1/2 lg:grid-cols-1 py-2">
            <Cards />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service