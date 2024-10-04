import React, { useState } from 'react';

import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import axios from 'axios';

import { BASE_URL } from '../config/apiConfig';

import { useNavigate } from 'react-router-dom';


const CreatePost = () => {

 

  const navigate = useNavigate();

  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');

  const [tags, setTags] = useState([]);

  const [image, setImage] = useState(null);

  const [tagInput, setTagInput] = useState('');

 

  const CREATE_POST_URL = "posts/create/";

  const [errorAlert, setErrorAlert] = useState(false);

  const [successAlert, setSuccessAlert] = useState(false);


  const handleAddTag = (e) => {

    e.preventDefault();

    if (tagInput !== '' && !tags.includes(tagInput)) {

      setTags([...tags, tagInput]);

      setTagInput('');

    }

  };


  const handleRemoveTag = (tagToRemove) => {

    setTags(tags.filter((tag) => tag !== tagToRemove));

  };

 

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

 

    const tagObjects = tags.map(tag =>{

      return { name: tag};

    })

 

    const createPostData ={

      title : title,

      content : content,

      tags: tagObjects,

      image_base64: image

    }

    await axios.post(BASE_URL+CREATE_POST_URL, createPostData,

      {

        headers:{

          'Content-Type':'application/json',

          'Authorization':`Bearer ${localStorage.getItem("authtoken")}`

        }

      }

    ).then(response => {

      if(response.status === 201){

        console.log('Blog created successfully');

      setSuccessAlert(true);

      setErrorAlert(false);

      setTitle('');

      setContent('');

      setTags([]);

      setImage(null);

      }

    }).catch (error => {

      if(error.status === 401){

       console.log("Login again to continue")

        navigate("/login");

      }

      console.log('Error while creating blog :'+error)

      setErrorAlert(true);

      setSuccessAlert(false);

        });

   

  };


  return (

    <div className="container mx-auto p-8 max-w-3xl">

      {errorAlert ? (<div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">

  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">

    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>

  </svg>

  <span class="sr-only">Info</span>

  <div>

    <span class="font-medium">Error creating blog!</span> Try again

  </div>

</div>):(<></>)}

{successAlert ? (<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">

  <span class="font-medium">Blog successfully created!</span>

</div>):(<></>)}

      <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>

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

          <label className="block mb-2">Tags:</label>

          <div className="flex flex-wrap gap-2">

            {tags.map((tag, index) => (

              <div key={index} className="flex h-8 items-center">

                <span class="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{tag}

                <svg onClick={() => handleRemoveTag(tag)} class="h-4 w-5 text-gray-500 hover:text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <line x1="9" y1="9" x2="15" y2="15" />  <line x1="15" y1="9" x2="9" y2="15" /></svg>

                </span>

              </div>

            ))}

          </div>

          <div className="mt-2 flex items-center">

            <input

              type="text"

              value={tagInput}

              onChange={(e) => setTagInput(e.target.value)}

              className="border border-gray-300 rounded p-2"

              placeholder="Add a tag"

            />

            <button

              type="button"

              onClick={handleAddTag}

              className="ml-2 bg-teal-500 text-white px-2 py-1 rounded"

            >

              Add

            </button>

          </div>

        </div>

        <div>

          <label className="block mb-2">Image:</label>

          <input

            type="file"

            onChange={handleImageChange}

            className="border border-gray-300 rounded w-full p-2"

            accept="image/*"

          />

        </div>

        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">

          Create Blog

        </button>

      </form>

    </div>

  );

};


export default CreatePost;