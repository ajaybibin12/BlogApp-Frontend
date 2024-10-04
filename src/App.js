import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';

import Navbar from './components/Navbar';

import Login from './pages/Login';

import Blog from './pages/Blog';

import Signup from './pages/Signup';

import EditProfile from './pages/EditProfile';

import MyPosts from './pages/MyPosts';

import CreatePost from './pages/CreatePost';

import EditPost from './pages/EditPost';

 

function App() {

  return (

    <Router>

      <Navbar />

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path='/blog/:id' element={<Blog />} />

      <Route path="/profile" element={<EditProfile />} />

      <Route path='/myposts/:id' element={<MyPosts/>}/>

      <Route path='/myposts' element={<MyPosts/>}/>

      <Route path='/createpost' element={<CreatePost/>}/>

      <Route path='/editpost/:id' element={<EditPost/>}/>

    </Routes>

  </Router>

  );

}

 

export default App;