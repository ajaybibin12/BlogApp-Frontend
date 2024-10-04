import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import EmptyList from '../components/NoBlogs';

import axios from 'axios';

import { BASE_URL } from '../config/apiConfig';


const Blog = () => {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);

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

      }

    }else{

      console.log('Error while fetching blog id:'+id);

    }

          }).catch (error => {

      console.log('Error while fetching blog id:'+id);

    });

    }

  }, [id]);

 

  return (

    <>

      {blog ? (

        <div className="container mx-auto p-8 max-w-3xl">

        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <div className="flex flex-wrap gap-2">

            {blog.tags.map((tag, index) => (

              <div key={index} className="flex h-8 items-center">

                <span class="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{tag.name}

                </span>

              </div>

            ))}

          </div>

        <div className="flex justify-between items-center text-gray-600 mb-6">

          <p>By <span className="font-semibold">{blog.author.username}</span></p>

          <p>{blog.created_at.split('T')[0]}</p>

        </div>

        <img

         className="w-full h-auto rounded-lg shadow-lg mb-8"

          src={"data:image/png;base64,"+blog.image_base64_read}

          alt={blog.title}

        />

        <div dangerouslySetInnerHTML={{__html: blog.content}} ></div>

      </div>

      ) : (

        <EmptyList />

      )}

    </>

  );

};

 

export default Blog;