import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import ThemeProvider from './ThemeProvider'
import { useSelector } from 'react-redux';


export default function Nav() {

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const { currentUser } = useSelector((state) => state.user);

    console.log(currentUser);
    
    return (
        <div className={`''`}>
            <header className={` h-20 py-2 border-b-2 border-b-green-500 flex flex-col justify-center`}>
                <div className=' w-full flex justify-between items-center max-w-6xl mx-auto p-3'>
                    <Link to='/'>
                        <h1 className='font-bold text-sm sm:text-3xl flex flex-wrap'>
                            <span className='text-blue-500'>Nest</span>
                            <span className='text-green-500'>Finder</span>
                        </h1>
                    </Link>
                    <form
                        onSubmit={handleSubmit}
                        className={`bg-slate-100 p-3 rounded-lg flex items-center transition-all ease-in-out duration-[1s]`}
                    >
                        <input
                            type='text'
                            placeholder='Search...'
                            className='bg-transparent text-gray-700 focus:outline-none w-24 sm:w-64'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type='submit'>
                            <FaSearch className='text-slate-600' />
                        </button>
                    </form>
                    <div className='flex items-center gap-4 font-medium text-lg'>
                        <Link to='/'>
                            <div className='hidden sm:inline text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:text-xl transition-all duration-300'>
                                Home
                            </div>
                        </Link>
                        <Link to='/about'>
                            <div className='hidden sm:inline text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:text-xl transition-all duration-300'>
                                About
                            </div>
                        </Link>
                        {currentUser ? (
                            <Link to={`/profile/${currentUser._id}`}>
                                <img
                                    className='rounded-full h-10 w-10 object-cover'
                                    src={currentUser.avatar}
                                    alt='profile'
                                />
                            </Link>
                        ):(
                            <Link to='/login'>
                                <div className='text-white px-2 py-1 rounded bg-blue-700 hover:border-2 hover:border-blue-700 hover:bg-transparent hover:text-blue-700'>
                                    Sign in
                                </div>
                            </Link>
                        )}
                        <ThemeProvider /> 
                    </div>
                </div>
            </header>
        </div>
    );
}
