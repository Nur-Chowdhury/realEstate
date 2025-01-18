import React, { useState } from 'react'
import Nav from '../Components/Nav'
import { Link } from 'react-router-dom';
import Ooath from '../Components/Ooath';


export default function SignIn() {

    const [formData, setFormData] = useState({});


    const handleSubmit = () => {
        console.log("hi");
    }

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
    };

    return (
        <div>
            <Nav />
            <div className=' mx-auto mt-12  md:my-24 py-4 px-16 border-2 border-green-500 max-w-lg rounded-xl shadow-lg shadow-gray-300 dark:shadow-gray-700'>
                <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        type='email'
                        placeholder='email'
                        className='border p-3 rounded-lg'
                        id='email'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='password'
                        placeholder='password'
                        className='border p-3 rounded-lg'
                        id='password'
                        onChange={handleChange}
                        required
                    />

                    <button
                        // disabled={loading}
                        className='bg-blue-500 text-white text-lg font-medium hover:bg-transparent hover:text-blue-500 hover:border-2 hover:border-blue-500
                        transition-all duration-300 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    >
                        {/* {loading ? 'Loading...' :  */}
                        Sign In
                    </button>
                    <Ooath />
                </form>
                <div className='flex gap-2 mt-5'>
                    <p>Dont have an account?</p>
                    <Link to={'/register'}>
                        <span className='text-blue-700'>Sign up</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
