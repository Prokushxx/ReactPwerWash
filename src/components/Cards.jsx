import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'

function Cards() {


  const [services, setServices] = useState([]);

  function getServices() {

    axios.get('http://127.0.0.1:8000/api/service')
      .then(res => {
        setServices(res.data)
      })
  }

  useEffect(() => {
    getServices();
  }, [])

  return (
    <div className='space-y-2'>
      {services.map((data) =>
        <div key={data.id} className="bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 cursor-grab">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-purple-900">{data.name}</h3>
            <h3 className="text-xl font-semibold text-purple-900">{data.cost}</h3>
            <p className="mb-6"> {data.desc}
            </p>
            <NavLink to={`/appointment/${data.id}`}
              className="block font-medium text-purple-600">Make Reservation</NavLink>
          </div>
          <img src="https://tailus.io/sources/blocks/end-image/preview/images/graphic.svg"
            className="w-2/3 ml-auto -mb-12" alt="illustration" loading="lazy" width="900" height="600" />
        </div>
      )}
    </div>
  )
}

export default Cards