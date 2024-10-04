import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import MyPostItem from '../components/MyPostItem';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { BASE_URL } from '../config/apiConfig';

 

const MyPosts = () => {

  const GET_BLOGS_URL = "posts";

    const { id } = useParams();

    const [blog, setBlog] = useState(null);

    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    const [myPosts, setMyPosts] = useState([]);

 

    const createPostHandler = ()=>{

      navigate("/createpost");

    }

  useEffect(() => {

 

    const getBlogs = async () => {

      const authorId = localStorage.getItem("user_id");

        await axios.get(BASE_URL+GET_BLOGS_URL,{
          headers: {
            'Content-Type': 'application/json',
          }
}).then(response =>{

  if(response.status ===200){

        const postsByUser = response.data.results.filter(blog=>blog.author.id === parseInt(authorId));

        setMyPosts(postsByUser);

        let blog = postsByUser.find((blog) => blog.id === parseInt(id));

        if (blog) {

          setBlog(blog);

          const tagNames = blog.tags.map(t => t.name);

          setTags(tagNames);

        }else{

          setBlog(postsByUser[0])

        }

      }

    }).catch(error =>{

      if(error.status ===401){

            console.log("Login again to continue")

            navigate("/login");

      }

      console.log(error);

    });

    }

    getBlogs();

  }, [id]);

 

 

   // handling pagination for home page

  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage=8;

  const indexOfLastBlog = currentPage*blogsPerPage;

  const indexFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = myPosts ?.slice(indexFirstBlog,indexOfLastBlog);

 

  const handleNextPage =()=>{

    if(currentPage < Math.ceil(myPosts.length/ blogsPerPage)){

    setCurrentPage(currentPage+1);

  }

};

const handlePreviousPage =()=>{

  if(currentPage > 1){

  setCurrentPage(currentPage-1);

}

};

 

  return (

    <div className="container mx-auto p-4">

      {myPosts ?(

        <div>

        <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600" onClick={createPostHandler}>

        Create new post

      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 h-18 lg:grid-cols-4 p-2 gap-4 bg-gray-100 min-h-screen">

      {currentBlogs.map((blog) => (

        <MyPostItem title={blog.title} content={blog.content} created_at={blog.created_at.split('T')[0]} tags={blog.tags.map(t => t.name)}  cover={"data:image/png;base64,"+blog.image_base64_read} id={blog.id} key={blog.id} />

      ))}

    </div>

    <div className="flex justify-center mt-4 space-x-2">

    <button onClick={handlePreviousPage} disabled={currentPage ===1} className='prev-page text-gray-800 py-1 px-2 rounded'>

    <svg className="h-6 w-6 text-teal-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="15 18 9 12 15 6" /></svg>

    </button>

    <span id='page-indicator' className='text-lg'>{currentPage}</span>

    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(myPosts.length/ blogsPerPage)} className='prev-page text-gray-800 py-1 px-2 rounded'>

    <svg className="h-6 w-6 text-teal-500"  width="12" height="12" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 6 15 12 9 18" /></svg>

    </button>

  </div>

    </div>

    ):(

      <div className="container text-center justify-center mx-auto p-8 max-w-3xl">

          <button className="bg-blue-500 p-10 text-center justify-center h-12 text-lg hover:bg-teal-600 text-white font-bold py-2 px-4 " onClick={createPostHandler}>

  Create new post

</button>

        </div>

    )}

    </div>

  );

};

 

export default MyPosts;