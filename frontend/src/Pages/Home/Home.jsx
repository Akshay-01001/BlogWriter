import React from 'react'
import Header from '../../components/Header/Header'
import BlogList from '../../components/BlogList/BlogList'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <BlogList />
      <Footer />
    </div>
  )
}

export default Home