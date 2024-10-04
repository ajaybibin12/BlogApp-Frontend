import React, { useState} from 'react';

import { useNavigate } from 'react-router-dom';

import PopUp from './PopUp';

import { ContentComponent } from './ContentComponent';

import { BASE_URL } from '../config/apiConfig';

import axios from 'axios';

 

const MyPostItem = ({title,

    content,

    created_at,

    cover,

    tags,

    id, onPostIdChange

}) => {

   

    const [openPopup, setOpenPopup] = useState(false);

 

    const HandleRemovePopUp = () => setOpenPopup(false);

 

    const navigate = useNavigate();

    const [deleted, setDeleted] = useState(false);

    const handlePostClick = () => {

        navigate("/blog/"+id);

    }

    const deletePostHandler= () => {

      setOpenPopup(true);

    }

       

      const editPostHandler= () => {

        navigate("/editpost/"+id);

        console.log("post edited : "+id)

      }

 

      const handleDeleted =(value)=>{

        setDeleted(value);

      }

 

  return (

    <div>

    <div key={id} className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">

      <div className='h-24'>

      <img onClick={handlePostClick}  className='w-full h-24 object-cover' src={cover} alt={title} />

      </div>

      <div className="p-6">

      <div className='h-24'>

      <h2 onClick={handlePostClick} className="text-sm font-bold text-gray-800 mb-2">{title}</h2>

      <div onClick={handlePostClick} className="text-gray-700 text-xsm h-10 leading-tight mb-4 overflow-hidden">

        <ContentComponent contentString={content}></ContentComponent>

        </div>

        </div>

        <div className='h-8'>

        {Array.isArray(tags) && tags.length >0 ? (

      <div className="flex flex-wrap gap-2">

            {tags.map((tag, index) => (

              <div key={index} className="flex h-8 items-center">

                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{tag}

                </span>

              </div>

            ))}

          </div>

          ):(<></>)}

          </div>

        <div className="flex justify-between items-center">

                <div className="flex items-center">

                <svg className="h-4 w-4 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>

                    <span className="text-gray-800 font-semibold">{localStorage.getItem("username")}</span>

                </div>

                <span className="text-gray-600">{created_at.split('T')[0]}</span>

            </div>

      <footer>

      <div className='flex justify-end gap-2 items-center blogItem-author'>

        <label className="rounded-full cursor-pointer" onClick={editPostHandler}>

            <svg className="h-5 w-5 text-gray-500"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>

        </label>

        <label className="rounded-full cursor-pointer" onClick={deletePostHandler}>

              <svg className="h-5 w-5 text-red-500"  viewBox="0 00 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>

        </label>

        <label className="rounded-full cursor-pointer" onClick={()=>navigate(`/blog/${id}`)}>

        <svg class="h-6 w-6 text-teal-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="7 7 12 12 7 17" />  <polyline points="13 7 18 12 13 17" /></svg>

        </label>

        </div>

      </footer>

      <PopUp openPopUp={openPopup} closePopUp={HandleRemovePopUp} setDeleted={handleDeleted} id={id} />

      </div>

    </div>

    </div>

  );

};

 

export default MyPostItem;