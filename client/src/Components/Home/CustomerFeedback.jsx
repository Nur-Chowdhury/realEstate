import React from 'react'
import user1 from '../../assets/user1.jpg'
import user2 from '../../assets/user2.jpg'
import user3 from '../../assets/user3.jpg'
import user4 from '../../assets/user4.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import FeedbackCard from '../FeedbackCard'


const feedbacks = [
    {
        img: user1,
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        name: "Alice"
    },
    {
        img: user2,
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        name: "Casey"
    },
    {
        img: user3,
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        name: "Damian"
    },
    {
        img: user4,
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        name: "Bob"
    },
]

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

export default function CustomerFeedback() {
    return (
        <div className=' mb-8'>
            <h1 className=' text-center text-3xl font-semibold my-12'>Customers Feedback</h1>
            <div className=' feedback min-h-[600px] mx-20 '>
                <Slider  {...settings}>
                    {feedbacks.map((feedback, index) => {
                        return (<FeedbackCard key={index} feedback={feedback} />)
                    })} 
                </Slider>
            </div>
        </div>
    );
}
