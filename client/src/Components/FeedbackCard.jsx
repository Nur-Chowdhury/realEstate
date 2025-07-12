import React from 'react'

import paris from '../assets/hero2.jpg'
import user from '../assets/user3.jpg'

export default function FeedbackCard({feedback}) {
    return (
        <div className="">
            <div className="relative group w-[350px] h-[500px] overflow-hidden rounded-2xl shadow-2xl shadow-gray-500 dark:shadow-gray-700 border-[1px] border-green-500">
                <p className=' h-[70%] text-center py-4 px-2 leading-10'>{feedback.des}</p>
    
                <div className="absolute bottom-0 w-full bg-black dark:bg-white text-white dark:text-black text-center py-4 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
                    <span className="block text-lg font-semibold">{feedback.name}</span>
                </div>
    
                <div className=" absolute bottom-8 left-[40%] w-[75px] h-[75px] border-[5px] transform -translate-x-1/2 border-white/70 
                rounded-full overflow-hidden transition-all duration-500 group-hover:bottom-[110px]  animate-bounce">
                    <img
                        src={feedback.img}
                        alt="User"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}


function Travelers() {
  
}

