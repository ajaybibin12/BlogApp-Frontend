import React from 'react';

import BlogItem from './BlogItem';

import NoBlogs from './NoBlogs';

import { useState } from 'react';

 

const BlogList = ({ blogs }) => {

  // handling pagination for home page

  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage=8;

  const indexOfLastBlog = currentPage*blogsPerPage;

  const indexFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = blogs ?.slice(indexFirstBlog,indexOfLastBlog);

 

  const handleNextPage =()=>{

    if(currentPage < Math.ceil(blogs.length/ blogsPerPage)){

    setCurrentPage(currentPage+1);

  }

};

const handlePreviousPage =()=>{

  if(currentPage > 1){

  setCurrentPage(currentPage-1);

}

};

 

  return (

   <div>

      {blogs === null ? (<NoBlogs />) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 h-22 lg:grid-cols-4 p-2 gap-4 bg-gray-100 min-h-screen">

      {currentBlogs.map((blog) => (

        <BlogItem description={blog.content} title={blog.title} createdAt={blog.created_at} authorName={blog.author.username} cover={"data:image/png;base64,"+blog.image_base64_read}  tags={blog.tags.map(t => t.name)} id={blog.id}  key={blog.id}/>

      ))}

    </div>

  )}

  <div className="flex top-full text-center flex justify-center mt-4 space-x-2">

    <button onClick={handlePreviousPage} disabled={currentPage ===1} className='prev-page text-gray-800 py-1 px-2 rounded'>

    <svg className="h-6 w-6 text-teal-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="15 18 9 12 15 6" /></svg>

    </button>

    <span id='page-indicator' className='text-lg'>{currentPage}</span>

    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(blogs.length/ blogsPerPage)} className='prev-page text-gray-800 py-1 px-2 rounded'>

    <svg className="h-6 w-6 text-teal-500"  width="12" height="12" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 6 15 12 9 18" /></svg>

    </button>

  </div>

  </div>

  );

};

 

export default BlogList;