import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Home/Navbar';
import { useNavigate } from 'react-router-dom';
import hero from '../assets/hero2.jpg';

export default function Home() {

    const [isScrolled, setIsScrolled] = useState(false); 
    const [imageLoaded, setImageLoaded] = useState(false);
    
    const handleScroll = () => { 
        const searchBar = document.getElementById('search-bar'); 
        const searchBarPosition = searchBar.getBoundingClientRect().top; 
        if (searchBarPosition <= 0) { 
            setIsScrolled(true);
        } else { 
            setIsScrolled(false); 
        }
    };

    useEffect(() => {
        setImageLoaded(true);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    
    useEffect(() => { 
        window.addEventListener('scroll', handleScroll); 
        return () => { window.removeEventListener('scroll', handleScroll); }; 
    }, [])

    return (
        <div>
            <Navbar isScrolled={isScrolled} handleSubmit={handleSubmit} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            
            {/* hero */}
            <div 
                className={`mx-4 rounded h-[600px] bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
                    imageLoaded ? 'blur-0 opacity-100' : 'blur-lg opacity-0'
                }`} 
                style={{ backgroundImage: `url(${hero})` }}
            >

            </div>
        </div>
    )
}
