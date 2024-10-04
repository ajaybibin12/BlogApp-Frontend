import React, { useState } from "react";

import { Link } from "react-router-dom";

import { BASE_URL } from "../config/apiConfig";

import axios from "axios";

 

const Signup = () => {

  const SIGNUP_URL = "signup/";

  const [errorAlert, setErrorAlert] = useState(false);

  const [successAlert, setSuccessAlert] = useState(false);

  const [passwordAlert, setPasswordAlert] =useState(false);

 

  const [formData, setFormData] = useState({

    username: "",

    email: "",

    password: "",

    mobile:""

  });

 

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({

      ...formData,

      [name]: value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

 

    const signUpData = {

      username: formData.username,

      email: formData.email,

      password: formData.password,

      mobile:formData.mobile

    };

    await axios.post(BASE_URL+SIGNUP_URL, signUpData,

      {

        headers:{

          'Content-Type':'application/json'

        }

      }

    ).then(response => {

      if(response.status === 201){

        console.log("User successfully signed up");

        setSuccessAlert(true);

        setErrorAlert(false);

        setFormData({ username: "", email: "", password: "", mobile:"" });

      }

    }).catch (error => {

      if(error.status = 400){

        console.log("invalid password");

        setErrorAlert(true);

        setPasswordAlert(true);

        setSuccessAlert(false)

      }

          console.log("Error while signing up : "+error);

          setErrorAlert(true);

          setSuccessAlert(false)

        });

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form  onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col">

        <h2 className="text-2xl font-bold mb-6 text-left">

          Create new account

        </h2>

        <div className="mb-4">

          <label

            className="block text-gray-700 text-sm font-bold mb-2"

            htmlFor="username"

          >

            User name

          </label>

          <input

            type="username"

            id="username"

            name="username"

            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

            placeholder="Enter user name"

            value={formData.username}

            onChange={handleChange}

            required

          />

       </div>

        <div className="mb-4">

          <label

            className="block text-gray-700 text-sm font-bold mb-2"

            htmlFor="email"

          >

            Email

          </label>

          <input

            type="email"

            id="email"

            name="email"

            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

            placeholder="Enter your email"

            value={formData.email}

            onChange={handleChange}

            required

          />

        </div>

        <div className="mb-4">

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">

            Phone Number

          </label>

          <input

            type="text"

            id="mobile"

            name="mobile"

            onChange={handleChange}

            value={formData.mobile}

            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

            placeholder="Enter your contact number"

          />

        </div>

 

        <div className="mb-6">

          <label

            className="block text-gray-700 text-sm font-bold mb-2"

            htmlFor="password"

          >

            Password

          </label>

          <input

            type="password"

            id="password"

            name="password"

            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

            placeholder="Enter your password"

            value={formData.password}

            onChange={handleChange}

            required

          />

        </div>

        <button

          type="submit"

          className="w-full bg-teal-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"

        >

          Submit

        </button>

        {errorAlert ? (

          <div

            className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"

            role="alert"

          >

            <svg

              className="flex-shrink-0 inline w-4 h-4 me-3"

              aria-hidden="true"

              xmlns="http://www.w3.org/2000/svg"

              fill="currentColor"

              viewBox="0 0 20 20"

            >

              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />

            </svg>

            <span className="sr-only">Info</span>

            {passwordAlert ? (

            <div>

              <span className="font-medium">Error!</span> Password does not meet the criteria.

              Try again

            </div>

            ):(

            <div>

              <span className="font-medium">Error!</span> Error signing you up.

              Try again

            </div>

            )};

          </div>

        ) : (

          <></>

        )}

        {successAlert ? (

          <div

            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"

            role="alert"

          >

            <span className="font-medium">Sign up Successful!</span>{" "}

            <Link className="text-green-800" to="/login">

              Log in

            </Link>{" "}

            to continue.

          </div>

        ) : (

          <></>

        )}

      </form>

    </div>

  );

};

 

export default Signup;