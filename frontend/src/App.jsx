import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import BlogPostRead from './Pages/blogs/BlogPostRead';
import UserPanel from './Pages/UserPanel/UserPanel';
import AddBlog from './components/AddBlog/AddBlog'; 
import Login from './components/Login/Login';
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile';
import UserBlogs from './components/UserBlogs/UserBlogs';
import Comment from './components/Comment/Comment';

function App() {
  return (
    // <Comment />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs/:id" element={<BlogPostRead />} />
        <Route path="/userpanel" element={<UserPanel />}>
          <Route index element={<AddBlog />} />
          <Route index path="add-blog" element={<AddBlog />} />
          <Route path="view-blogs" element={<UserBlogs />} />
          <Route path="profile" element={<Profile />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
