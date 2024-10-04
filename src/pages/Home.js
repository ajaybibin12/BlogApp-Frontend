 

import React from 'react';

import BlogList from '../components/BlogsList';

import { useState, useEffect } from 'react';

import NoBlogs from '../components/NoBlogs';

import { BASE_URL } from '../config/apiConfig';

import axios from 'axios';

 

function Home(){

    const GET_BLOGS_URL = "posts";

    const [blogs, setBlogs] = useState([]);

 

    useEffect( () => {

      const getBlogs = async () => {

        await axios.get(BASE_URL+GET_BLOGS_URL).then(response =>{

          if(response.status===200){

          setBlogs(response.data.results);

          }else{

            console.log("Error while fetching blogs");

          }

        }).catch(error =>{

          console.log(error);

        });

      }

   

      getBlogs();

    }, []);

 

    return(

    <div className="container mx-auto p-4">

      <div>

      {!blogs.length ? <NoBlogs /> : <BlogList blogs={blogs} />}

      </div>

    </div>

  );

}

 

export default Home;