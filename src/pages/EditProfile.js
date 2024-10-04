import React, { useState, useEffect } from "react";


import { useNavigate } from 'react-router-dom';

import { BASE_URL } from "../config/apiConfig";

import axios from "axios";


const EditProfile = () => {

 

  const UPDATE_PROFILE_URL = "profile/update/";

  const USER_URL = BASE_URL+"profile";

 

  const [errorAlert, setErrorAlert] = useState(false);

  const [successAlert, setSuccessAlert] = useState(false);

 

    const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [username, setUsername] = useState(+'');

  const [mobile, setMobile] = useState('');

  const [profilePicture, setProfilePicture] = useState('');

 

  useEffect(() => {

    const getUserDetails = async () => {

      await axios.get(`${USER_URL}/${localStorage.getItem("user_id")}/`,

        {

                headers:{

                  Authorization: `Bearer ${localStorage.getItem("authtoken")}`,

                },

      }).then(response =>{

        if(response.status ===200){

        const user = response.data;

        console.log('User details fethched');

        setUsername(user.username);

        setMobile(user.mobile);

        setEmail(user.email);

        setProfilePicture(user.profile_picture_as_base64);

 

        }

      }).catch (error => {

        if(error.status === 401){

          console.log("Login again to continue")

          navigate("/login");

        }

              console.log('Error while fetching user details');

            });

    }

    getUserDetails();

  },[]);

 

  const handleCancel = () => {

    navigate('/');

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

   

    const data ={

      email : email,

      mobile : mobile,

      username: username,

      profile_picture_base64: profilePicture

    }

      await axios.patch(BASE_URL+UPDATE_PROFILE_URL, data, {

        headers: {

          'Content-Type': 'application/json',

          'Authorization': `Bearer ${localStorage.getItem("authtoken")}`,

        }

      }).then(response =>{

        if(response.status ===200){

        console.log('Profile updated successfully')

        setErrorAlert(false);

        setSuccessAlert(true);

        localStorage.setItem("profile",profilePicture);

        }

      }).catch (error => {

        if(error.status === 401){

          console.log("Login again to continue")

          navigate("/login");

        }

        console.log('Error while updating profile ', error)

      setErrorAlert(true);

      });

  };

 

  const handleProfilePictureChange=(e) => {

    const file = e.target.files[0];

    if(file){

 

      const reader = new FileReader();

      reader.onload = function(e) {

        const base64 = e.target.result;

        setProfilePicture(base64);

      };

      reader.onerror = function(error) {

        console.error('Error reading file: ',error)

      };

      reader.readAsDataURL(file);

    }

 

  }


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-3/4 bg-white shadow-lg rounded-lg flex">

        <div className="w-1/4 bg-teal-500 text-white p-6">

          <div className="flex flex-col items-center">

            <svg

xmlns="http://www.w3.org/2000/svg"

              className="h-12 w-12 mb-4"

              fill="none"

              viewBox="0 0 24 24"

              stroke="currentColor"

              strokeWidth="2"

            >

            </svg>

            <h2 className="text-lg font-semibold">Profile</h2>

          </div>

        </div>


  <div className="w-3/4 p-8">

  {errorAlert ? (<div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">

  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">

    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>

  </svg>

  <span class="sr-only">Info</span>

  <div>

    <span class="font-medium">Error updating profile!</span> Try again

  </div>

</div>):(<></>)}

{successAlert ? (<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">

  <span class="font-medium">Profile successfully updated!</span>

</div>):(<></>)}

          <h2 className="text-2xl font-semibold mb-6">

            Edit Your Details Here</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

          <div className="relative w-24 h-24">

              {profilePicture ? (

                <img

                  src={profilePicture}

                  alt="Profile Preview"

                  className="w-full h-full object-cover rounded-full"

                />

              ) : (

                <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-700">

                  No Image

                </div>

              )}

              <label htmlFor="profile-picture-upload" className="absolute bottom-0 right-0 p-1 rounded-full cursor-pointer">

              <svg width="24"  height="24"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>

              </label>

              <input

                type="file"

                id="profile-picture-upload"

                accept="image/*"

                onChange={handleProfilePictureChange}

                className="hidden"

              />

            </div>

            <div>

              <label htmlFor="username" className="block text-sm font-medium text-gray-500">

                Username

              </label>

              <input

                type="text"

                id="username"

                value={username}

                disabled

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"

              />

            </div>

            <div>

              <label htmlFor="email" className="block text-sm font-medium text-gray-700">

                Email

              </label>

              <input

                type="email"

                id="email"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"

              />

            </div>

            <div>

              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">

                Phone Number

              </label>

              <input

                type="text"

                id="mobile"

                value={mobile}

                onChange={(e) => setMobile(e.target.value)}

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"

              />

            </div>


            {/* Buttons */}

            <div className="flex justify-end space-x-4">

              <button

                type="button"

                onClick={handleCancel}

                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"

              >

                Cancel

              </button>

              <button

                type="submit"

                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"

              >

                Submit

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

};

 

export default EditProfile;