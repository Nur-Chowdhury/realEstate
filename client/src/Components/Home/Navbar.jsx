import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { FaMoon, FaSun } from 'react-icons/fa';
import ThemeProvider from '../ThemeProvider';

export default function Navbar({ isScrolled, handleSubmit, setSearchTerm, searchTerm }) {

    const [noBg, setNoBg] = useState(false);
    const addBgColor = () => {
        if (window.scrollY >= 20) {
            setNoBg(true);
        } else {
            setNoBg(false);
        }
    };

    const { currentUser } = useSelector((state) => state.user);

    window.addEventListener('scroll', addBgColor);

    return (
        <div className={`${noBg ? 'fixed z-50 w-full bg-white dark:bg-black transition-all duration-500 border-b-2 border-b-green-500' : ''}`}>
            <header className={`h-18 ${!isScrolled ? '' : ''}`}>
                <div className='flex justify-between items-center max-w-6xl mx-auto py-3'>
                    <Link to='/'>
                        <h1 className='font-bold text-sm sm:text-3xl flex flex-wrap'>
                            <span className='text-blue-500'>Nest</span>
                            <span className='text-green-500'>Finder</span>
                        </h1>
                    </Link>
                    <form
                        onSubmit={handleSubmit}
                        className={`bg-slate-100 p-3 rounded-lg flex items-center transition-all ease-in-out duration-[1s] ${
                            !isScrolled ? 'hidden' : ''
                        }`}
                    >
                        <input
                            type='text'
                            placeholder='Search...'
                            className='bg-transparent focus:outline-none w-24 sm:w-64'
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
