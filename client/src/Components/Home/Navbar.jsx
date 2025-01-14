import React from 'react'
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';


export default function Navbar({isScrolled, handleSubmit, setSearchTerm, searchTerm}) {


    return (
        <div>
            <header className={`${!isScrolled ? " py-2":""}`}>
                <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                    <Link to='/'>
                        <h1 className='font-bold text-sm sm:text-3xl flex flex-wrap'>
                            <span className='text-blue-500'>Nest</span>
                            <span className='text-green-500'>Finder</span>
                        </h1>
                    </Link>
                    <form
                        onSubmit={handleSubmit}
                        className={`bg-slate-100 p-3 rounded-lg flex items-center ${!isScrolled ? "hidden":""}`}
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
                            <div className='hidden sm:inline text-slate-700 hover:text-blue-600 hover:text-xl transition-all duration-300'>
                                Home
                            </div>
                        </Link>
                        <Link to='/about'>
                            <div className='hidden sm:inline text-slate-700 hover:text-blue-600 hover:text-xl transition-all duration-300'>
                                About
                            </div>
                        </Link>
                        <Link to='/login'>
                            <div className=' text-white px-2 py-1 rounded bg-blue-700 hover:border-2 
                            hover:border-blue-700 hover:bg-transparent hover:text-blue-700'>
                                Sign in
                            </div>
                        </Link>
                    </div>

                </div>
            </header>
        </div>
    )
}
