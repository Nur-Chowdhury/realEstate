import React, { useEffect, useState, useRef } from 'react';
import Header from '../Components/Header';
import Navbar from '../Components/Home/Navbar';
import { useNavigate } from 'react-router-dom';
import hero from '../assets/hero3.jpg';
import { FaSearch } from 'react-icons/fa';
import Showcase from '../Components/Home/Showcase';
import BlogPart from '../Components/Home/BlogPart';

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const heroSearchBarRef = useRef(null);

    useEffect(() => {
        setImageLoaded(true);

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(!entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.1,
            }
        );

        if (heroSearchBarRef.current) {
            observer.observe(heroSearchBarRef.current);
        }

        return () => {
            if (heroSearchBarRef.current) {
                observer.unobserve(heroSearchBarRef.current);
            }
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    return (
        <div>
            <Navbar
                isScrolled={isScrolled}
                handleSubmit={handleSubmit}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            {/* hero */}
            <div
                className={`mx-4  rounded-xl h-[600px] bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
                    imageLoaded ? 'blur-0 opacity-100' : 'blur-lg opacity-0'
                }`}
                style={{ backgroundImage: `url(${hero})` }}
            >
                <div className='h-full flex flex-col text-5xl font-extrabold py-16 text-teal-100 mx-16'>
                    <div className='flex flex-col gap-1 items-center lg:items-start'>
                        <h1>Welcome to</h1>
                        <h1>
                            <span className='text-blue-700'>Nest</span>
                            <span className='text-green-700'>Finder</span>
                        </h1>
                        <h1>Your Future Home Awaits</h1>
                    </div>
                    <div
                        ref={heroSearchBarRef}
                        className='flex justify-center my-40 text-lg'
                    >
                        <form
                            id="search-bar"
                            onSubmit={handleSubmit}
                            className={`bg-slate-100 p-3 rounded-lg flex items-center ${
                                isScrolled ? 'hidden' : ''
                            }`}
                        >
                            <input
                                type='text'
                                placeholder='Search...'
                                className='bg-transparent focus:outline-none w-24 sm:w-96 text-black font-normal'
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                            />
                            <button type='submit'>
                                <FaSearch className='text-slate-600' />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className=' my-16 '>
                <Showcase />
            </div>
            <div className=' my-16'>
                <BlogPart />
            </div>
        </div>
    );
}
