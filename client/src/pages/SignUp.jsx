import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';
import {toast} from 'react-toastify';
import Nav from '../Components/Nav'

export default function SignUp() {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setLoading(false);
                toast.error(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            toast.success("Registration Success!");
            navigate('/login');
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <div>
            <Nav />
            <div className=' mx-auto mt-12  md:my-24 py-4 px-16 border-2 border-green-500 max-w-lg rounded-xl shadow-lg shadow-gray-300 dark:shadow-gray-700'>
                <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-black'>
                    <input
                        type='text'
                        placeholder='username'
                        className='border p-3 rounded-lg'
                        id='username'
                        onChange={handleChange}
                    />
                    <input
                        type='email'
                        placeholder='email'
                        className='border p-3 rounded-lg'
                        id='email'
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        placeholder='password'
                        className='border p-3 rounded-lg text-2xl font-bold'
                        id='password'
                        onChange={handleChange}
                    />
            
                    <button
                        disabled={loading}
                        className='bg-blue-500 text-white text-lg font-medium hover:bg-transparent hover:text-blue-500 hover:border-2 hover:border-blue-500
                        transition-all duration-500 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 hover:scale-105'
                    >
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                    <OAuth />
                </form>
                <div className='flex gap-2 mt-5'>
                    <p>Have an account?</p>
                    <Link to={'/login'}>
                        <span className='text-blue-700'>Sign in</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
