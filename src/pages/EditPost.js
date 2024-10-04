import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router';

import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../config/apiConfig';

import axios from 'axios';


const EditPost = () => {

 

    const navigate = useNavigate();

 

  const { id } = useParams();

  const [blog, setBlog] = useState(null); 

  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');

  const [image, setImage] = useState('');

  const GET_BLOG_URL = BASE_URL+"posts";

 

  useEffect(() => {

    fetchBlog();

 

    async function fetchBlog() {

        await axios.get(`${GET_BLOG_URL}/${id}/`).then(response=> {

          if(response.status ===200){

            console.log('Blog fethched');

            let blog = response.data;

      if (blog) {

        setBlog(blog);

        setTitle(blog.title);

      setContent(blog.content);

      setImage(blog.image_base64_read);

      }

    }else{

      console.log('Error while fetching blog id:'+id);

    }

          }).catch(error => {

      console.log('Error while fetching blog id:'+id);

    });

    }

  }, [id]);

 

  const UPDATE_POST_URL = BASE_URL+"posts/id/update/";

  const [errorAlert, setErrorAlert] = useState(false);

  const [successAlert, setSuccessAlert] = useState(false);

 

 

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if(file){

      const reader = new FileReader();

      reader.onload = function(e) {

        const base64 = e.target.result;

        setImage(base64);

      };

      reader.onerror = function(error) {

        console.error('Error reading file: ',error)

      };

      reader.readAsDataURL(file);

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

 

    const createPostData ={

      title : title,

      content :content,

      image_base64 : image

    }

    console.log(createPostData + "createPostData")

      await axios.patch(UPDATE_POST_URL.replace("id",id), createPostData,{

 

        headers: {

          'Content-Type': 'application/json',

          'Authorization':`Bearer ${localStorage.getItem("authtoken")}`

        },

      }).then(response => {

        if(response.status===200){

          console.log('Blog updated successfully');

      setSuccessAlert(true);

      setErrorAlert(false);

        }

      }).catch(error=>{

        if(error.status === 401){

          console.log("Login again to continue")

          navigate("/login");

        }

        console.log('Error while updating blog ')

        setErrorAlert(true);

        setSuccessAlert(false);

      });

  };

  const handleCancel = () => {

    navigate('/myposts');

  };


  return (

    <div className="container mx-auto p-8 max-w-3xl">

      {errorAlert ? (<div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">

  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">

    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>

  </svg>

  <span class="sr-only">Info</span>

  <div>

    <span class="font-medium">Error updating blog!</span> Try again

  </div>

</div>):(<></>)}

{successAlert ? (<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">

  <span class="font-medium">Blog successfully updated!</span>

</div>):(<></>)}

      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>

          <label className="block mb-2">Title:</label>

          <input

            type="text"

            value={title}

            onChange={(e) => setTitle(e.target.value)}

            className="border border-gray-300 rounded w-full p-2"

            required

          />

        </div>

        <div>

          <label className="mb-2">Content:</label>

          <ReactQuill

            value={content}

            onChange={ setContent}

            className="border border-gray-300 rounded rounded w-full p-2"

            theme="snow"

            placeholder='Write your content here'

            required

          />

        </div>

        <div>

          <label className="block mb-2">Image:</label>

          {image ? (

          <img

          className="w-48 h-auto shadow-lg mb-8"

          src={"data:image/png;base64,"+image}

          alt={id}

        />

      ):(<></>)}

          <input

            type="file"

            onChange={handleImageChange}

            className="border border-gray-300 rounded w-full p-2"

            accept="image/*"

          />

        </div>

        <div className='flex space-between justify-content gap-2'>

        <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">

          Cancel

        </button>

        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-900">

          Save

        </button>

        </div>

      </form>

    </div>

  );

};


export default EditPost;