import axios from 'axios'

import React from 'react'

import { BASE_URL } from '../config/apiConfig';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

 

 

const PopUp = ({ openPopUp, closePopUp, id , setDeleted}) => {

 

    const DELETE_URL = BASE_URL+"posts/id/delete/";

    const navigate = useNavigate();

 

  const handleclosePopUp = (e) => {

      closePopUp();

   

  }

 

  const handleDelete = async()=>{

    await axios.delete(DELETE_URL.replace("id",id),{

        headers:{

          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,

        },

      }).then(response => {

      console.log("blog deleted : "+id)

      navigate("/myposts");

      }).catch(error => {

        console.log("Error deleting blog")

      });

      setDeleted(true);

      closePopUp();

    }

 

    if (openPopUp !== true) return null

 

 

  return (

    <div

    id='ModelContainer'

    onClick={handleclosePopUp}

    className='fixed inset-0 bg-gray flex justify-center items-center bg-opacity-20 backdrop-blur-sm'>

        <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative">

        <div class="p-6 pt-0 text-center">

            <h3 class="text-lg font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this blog?</h3>

            <a href="#"   onClick={handleDelete}

                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">

                Delete

            </a>

            <a href="#" onClick={handleclosePopUp}

                class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"

                data-modal-toggle="delete-user-modal">

                Cancel

            </a>

        </div>

        </div>

        </div>

  )

}

 

export default PopUp

 