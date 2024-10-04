import React, { useState, useEffect } from 'react';

import { Link,  useLocation, useNavigate } from 'react-router-dom';

import profileNoImage from '../assets/profile-noimage.jpg'

import logo from '../assets/logo.jpeg';

 


export default function Navbar (){

  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {

    setIsOpen(!isOpen);

  };

  const [loggedIn, setLoggedIn] = useState(false);

  const [userName, setUserName] = useState('');

  const [profilePicture, setProfilePicture] = useState('');

  const location = useLocation();

const navigate = useNavigate();

 const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  useEffect( () => {

    const token = localStorage.getItem("authtoken");

    const username = localStorage.getItem("username");

    const profile = localStorage.getItem("profile");

    if(token ){

      setLoggedIn(true);

      setUserName(username);

      if(profile){

      setProfilePicture(profile);

      }else{

        setProfilePicture(profileNoImage);

      }

    }

  }, [location]);

 

 

  const toggleDropdown = () => {

    setIsDropdownOpen(!isDropdownOpen);

  };


  const handleSignOut = () => {

    toggleDropdown();

    setLoggedIn(false);

    localStorage.clear("authtoken");

    localStorage.clear("username");

    localStorage.clear("user_id");

    localStorage.clear("profile");

    navigate("/");

  };


  return (

    <nav className="shadow-md p-4">

      <div className="container mx-auto flex justify-between items-center">

      <Link className="text-black no-underline text-xl font-bold" to="/">

        <img

          className="h-8"

          src={logo}

          alt="logo"

        />

        Blog App</Link>

       

        {/* Hamburger Icon */}

        <div className="md:hidden">

            <svg onClick={toggleMenu} className="h-8 w-8 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"> 

              {/* <line x1="3" y1="12" x2="21" y2="12" />  <line x1="3" y1="6" x2="21" y2="6" />  <line x1="3" y1="18" x2="21" y2="18" /> */}

              <path

                strokeLinecap="round"

                strokeLinejoin="round"

                strokeWidth="2"

                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}

              />

              </svg>

 

          

        </div>


        <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>

          {loggedIn ? (

            <div className="flex items-center space-x-10">

              <Link className="text-black no-underline" to="/">Home</Link>

              <Link className="text-black no-underline" to="/">About</Link>

              <Link className="text-black no-underline" to="/myposts">My Posts</Link>

            <div className="flex items-center space-x-2">

              <img

                onClick={toggleDropdown}

                className="h-10 w-10 rounded-full object-cover cursor-pointer"

src={profilePicture}

                alt="Profile"

              />

              <span onClick={toggleDropdown} className="text-black cursor-pointer">

                {userName}

              </span>

              </div>

              {isDropdownOpen && (

                <div className="absolute top-16 right-0 mt-2 w-60 bg-white rounded-md shadow-lg py-2 z-10">

                <Link to="/profile" className="block px-4 text-center py-2 text-gray-800 hover:bg-gray-200 no-underline" onClick={toggleDropdown}>

                    Edit Profile

                </Link>

                <div className='flex items-center space-x-0 px-4 py-2'>

                <button

                    onClick={handleSignOut}

                    className="btn block w-full text-left px-4 py-2 text-danger"

                  >

                    Sign Out

                  </button>

                </div>

              </div>

              )}

            </div>

          ) : (

            //User not logged In

            <div className="flex items-center space-x-2">

              <Link className="text-black no-underline" to="/">Home</Link>

              <svg className="h-10 w-10 text-gray-500" onClick={toggleDropdown} fill="none" viewBox="0 0 24 24" stroke="currentColor">

  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>

</svg>

              <span onClick={toggleDropdown} className="text-black cursor-pointer">

                Login

              </span>

                {isDropdownOpen && (

                <div className="absolute right-0 top-16 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-10">

                  <Link

                    to="/login"

                    className="block px-4 py-2 text-teal-800 font-bold no-underline hover:underline"

                    onClick={toggleDropdown}>

                    Login

                  </Link>

                  <div className='flex items-center space-x-0 px-4 py-2'>

                  <p className=" text-gray-700">Don't have an account? <Link

                    to="/signup"

                    className="text-teal-800 font-bold no-underline hover:underline"

                    onClick={toggleDropdown}>

                    Sign Up

                  </Link></p>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </nav>

  );

};