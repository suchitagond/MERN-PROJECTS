import React from 'react'
import logo from '../movie.jpg'
import { Link } from 'react-router-dom'

const Navbar=() =>{
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4'>
        <img className='w-[50px]' src={logo} alt="" />
        <Link to="/" className='text-blue-500 text-1xl font-bold'>Movies</Link>
        <Link to="/Watchlist" className='text-blue-500 text-1xl font-bold'>Watchlist</Link>
    </div>
  )
}

export default Navbar