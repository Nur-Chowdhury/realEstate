import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../Cards';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const data = [
    {
        heading: "01. Card One",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
    {
        heading: "02. Card Two",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
    {
        heading: "03. Card Three",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
    {
        heading: "04. Card Four",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
];

const data2 = [
    {
        heading: "01. Card One",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
    {
        heading: "02. Card Two",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
    {
        heading: "03. Card Three",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
    {
        heading: "04. Card Four",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
];

const data3 = [
    {
        heading: "01. Card One",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
    {
        heading: "02. Card Two",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
    {
        heading: "03. Card Three",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
    {
        heading: "04. Card Four",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/",
    },
];

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // Optional: Hides the default arrows for a cleaner look
    autoplay: true, // Optional: Enables autoplay
    autoplaySpeed: 3000, // Optional: Sets the autoplay speed
    pauseOnHover: true, // Stops autoplay when hovering over a slide
};

export default function Showcase() {

    const [type, setType] = useState(1);

    return (
        <div className=' mb-8'>
            <h1 className=' text-center text-3xl font-semibold'>Offers</h1>
            <div className=' flex mx-20 my-8 text-2xl font-semibold'>
                <div 
                    className={` w-1/3 text-center border-b-4 pb-2 cursor-pointer transition-all duration-500 
                        ${ type === 1 ? " border-b-green-500":"border-b-gray-200"}`}
                    onClick={() => setType(1)}
                >
                    Recent Offers
                </div>
                <div 
                    className={` w-1/3 text-center border-b-4 pb-2 cursor-pointer transition-all duration-500
                    ${ type === 2 ? " border-b-green-500":"border-b-gray-200"}`}
                    onClick={() => setType(2)}
                >
                    Recent places for rent
                </div>
                <div 
                    className={` w-1/3 text-center border-b-4 pb-2 cursor-pointer transition-all duration-500
                        ${ type === 3 ? " border-b-green-500":"border-b-gray-200"}`}
                    onClick={() => setType(3)}
                >
                    Recent places for sale
                </div>
            </div>
            <div className=' min-h-[600px] mx-20 '>
                { type ===1 && (
                    <Slider  {...settings}>
                        {data.map((item, index) => {
                            console.log(item); // Debugging: Check if items are being logged
                            return (<Cards key={index} item={item} />)
                        })}
                    </Slider>
                )}
                { type ===2 && (
                    <Slider  {...settings}>
                        {data2.map((item, index) => {
                            console.log(item); // Debugging: Check if items are being logged
                            return (<Cards key={index} item={item} />)
                        })}
                    </Slider>
                )}
                { type ===3 && (
                    <Slider  {...settings}>
                        {data3.map((item, index) => {
                            console.log(item); // Debugging: Check if items are being logged
                            return (<Cards key={index} item={item} />)
                        })}
                    </Slider>
                )}
            </div>
        </div>
    );
}
