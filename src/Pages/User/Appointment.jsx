import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputBox from '../../components/InputBox';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function Appointment() {

  const { id } = useParams();

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
  
  const [info, setInfo] = useState({
    user_id: window.user.id,
    service_id: id,
    date: '',
    time: '',
  })

  const [error, setError] = useState({
    validerror: [],
  })

  const [data, setData] = useState({
    name: '',
    cost: '',
    desc: '',
  });

  function getData() {
    axios.get(`http://127.0.0.1:8000/api/service/${id}`)
      .then(res => {
        // console.log(res.data);
        setData(res.data);
      }).catch(err => {
        console.log(err);
      })
  }

  function handleChange(e) {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  }

  
  // const getreserve = JSON.parse(localStorage.getItem('auth_reservation'));

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(`http://127.0.0.1:8000/api/appointment/`, info)
      .then(res => {
        if (res.data.error) {
          setError({
            ...error,
            validerror: res.data.error,
          })
        }
        else{
          http.get('http://127.0.0.1:8000/api/reserveuser')
          .then(res => {
            localStorage.removeItem('auth_reservation');
            localStorage.setItem('auth_reservation',JSON.stringify(res.data.reservation));
            Swal.fire('Appoitment Requested','Check Reservations for update','success')
          })
        }
      }).catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 space-x-3">
        <div className="h-screen w-full flex justify-center items-center">
          <div className="shadow-xl w-3/4 h-3/4 rounded-lg flex items-center justify-center">
            <form className="space-y-4" onSubmit={handleSubmit}>


              <div>
                <span className="text-red-500">{error.validerror.date}</span>
                {/* <label htmlFor="date">Date</label><br />
                <input type="date" 
              className="w-full px-4 py-1 border-2 border-gray-500 active:border-gray-400" /> */}
                <InputBox name='date'
                  inputType='date'
                  styleInput='w-full px-4 py-1 border-2 border-gray-500 active:border-gray-400'
                  inputLabel='Date'
                  onChange={handleChange} />
              </div>


              <div>
                <span className="text-red-500">{error.validerror.time}</span>
                {/* <label htmlFor="date">Time</label><br />
                <input type="time"
                  className="w-full px-4 py-1 border-2 border-gray-500 active:border-gray-400" /> */}
                <InputBox inputType='time'
                  name='time'
                  styleInput='w-full px-4 py-1 border-2 border-gray-500 active:border-gray-400'
                  inputLabel='Time' onChange={handleChange} />
              </div>

              <div>
                <button type="submit"
                  className="w-9/10 px-4 py-1  border-2 border-gray-500 hover:border-green-400">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="container m-auto px-6 text-gray-500 md:px-12 xl:px-0 ">
            <div className="mx-auto h-3/4 md:w-3/4 lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 cursor-grab">
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-purple-900">
                    {data.name}
                  </h3>
                  <h3 className="text-xl font-semibold text-purple-900">
                    {data.cost}
                  </h3>
                  <p className="mb-6">
                    {data.desc}
                  </p>
                </div>
                <img src="https://tailus.io/sources/blocks/end-image/preview/images/graphic.svg"
                  className="w-2/3 ml-auto -mb-12" alt="illustration" loading="lazy" width="900" height="600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment