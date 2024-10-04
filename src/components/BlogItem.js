import React from 'react';

import { Link } from 'react-router-dom';

import { ContentComponent } from './ContentComponent';

 

const BlogItem = ({

    description,

    title,

    createdAt,

    authorName,

    authorAvatar,

    cover,

    tags,

    category,

    id,

  }) => {

 

    const dateString = createdAt.split('T')[0];

 

  return (

    <Link className='no-underline text-black' >

    <div key={id} className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">

    <div className='h-24'>

      <img className='w-full h-24 object-cover' src={cover} alt={title} />

      </div>

      <div className="p-6">

      <div className='h-24'>

      <h2 className="text-sm font-bold text-gray-800 mb-2">{title}</h2>

     <div className="text-gray-700 text-xsm h-10 leading-tight mb-4 overflow-hidden">

        <ContentComponent contentString={description}></ContentComponent>

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

          ):(

            <></>

          )}

          </div>

        <div className="flex justify-between items-center">

                <div className="flex items-center">

                <svg className="h-4 w-4 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>

                    <span className="text-gray-800 font-semibold">{authorName}</span>

                </div>

                <span className="text-gray-600">{dateString}</span>

            </div>

      </div>

    </div>

    </Link>

  );

};

 

export default BlogItem;