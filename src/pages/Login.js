import React from 'react';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { BASE_URL } from '../config/apiConfig';

 


const Login = () => {

  const LOGIN_URL = "login/";

  const USER_URL = BASE_URL+"profile";

 

  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    username: '',

    password: ''

  });

 

  const handleChange = (e) => {

    const {name,value} = e.target;

    setFormData({

      ...formData, [name]:value,

    });

  }

  const handleSubmit = async (e) => {

    e.preventDefault();

 

  const loginData ={

    username : formData.username,

    password: formData.password

  }

    await axios.post(BASE_URL+LOGIN_URL, loginData,

      {

        headers:{

          'Content-Type':'application/json'

        }

      }

    ).then(response => {

      if(response.status === 200){

        setAlert(false);

        console.log('User successfully logged in');

        localStorage.setItem('authtoken', response.data.access);

        localStorage.setItem('username',response.data.username);

        localStorage.setItem('user_id',response.data.user_id);

        getUserDetails();

      }else{

        console.log(response);

          setAlert(true);

      }

    }).catch (error => {

          console.log(error);

          setAlert(true);

        });

  };

 

  const getUserDetails = async () => {

    await axios.get(`${USER_URL}/${localStorage.getItem("user_id")}/`,

      {

              headers:{

                Authorization: `Bearer ${localStorage.getItem("authtoken")}`,

              },

    }).then(response =>{

      if(response.status ===200){

      console.log('User details fethched');

      localStorage.setItem('profile',response.data.profile_picture_as_base64);

      navigate("/");

      }else{

        console.log('Error while fetching user details');

      }

    }). catch (error => {

            console.log('Error while fetching user details');

          });

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form  onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col">

        <h2 className="text-2xl font-bold mb-6 text-left">Log In</h2>

        <div className="mb-4">

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">

            Email / User name

          </label>

          <input

            type="username"

            id="email"

            name="username"

            onChange={handleChange}

            required

            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

            placeholder="Enter your email or user name"

          />

        </div>

        <div className="mb-6">

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">

            Password

          </label>

          <input

            type="password"

            id="password"

            name="password"

            required

            onChange={handleChange}

            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

            placeholder="Enter your password"

          />

        </div>

        <button

          type="submit"

          className="w-full bg-teal-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">

          Log In

        </button>

        {alert ? (<div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">

  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">

    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>

  </svg>

  <span className="sr-only">Info</span>

  <div>

    <span className="font-medium">Error!</span> Provide valid email/username and password for logging in.

  </div>

</div>) :

(<></>)}

      </form>

    </div>

  );

};


export default Login;