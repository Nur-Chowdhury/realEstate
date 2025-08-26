import React, { useState } from 'react'
import Nav from '../Components/Nav'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';


export default function SignIn() {

    const [formData, setFormData] = useState({});

    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                toast.error(data.message);
                dispatch(signInFailure(data.message));
            }
            toast.success("Login Successfull!");
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            toast.error(error.message);
            dispatch(signInFailure(error.message));
        }
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
                        className='border p-3 rounded-lg text-black'
                        id='email'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='password'
                        placeholder='password'
                        className='border p-3 rounded-lg text-black'
                        id='password'
                        onChange={handleChange}
                        required
                    />

                    <button
                        // disabled={loading}
                        className='bg-blue-500 text-white text-lg font-medium hover:bg-transparent hover:text-blue-500 hover:border-2 hover:border-blue-500
                        transition-all duration-500 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 hover:scale-105'
                    >
                        {loading ? 'Loading...' : "Sign In"}
                    </button>
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
