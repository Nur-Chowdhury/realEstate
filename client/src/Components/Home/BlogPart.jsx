import React from 'react'

import pic1 from '../../assets/hero4.jpg'
import pic2 from '../../assets/hero5.jpg'
import pic3 from '../../assets/hero6.jpg'

export default function BlogPart() {
    return (
        <div className='my-4 relative'>
            <div className=' w-full z-30 absolute text-center text-xl font-medium my-28  flex flex-col gap-12 justify-between items-center text-white'>
                <h3>Unique Homes</h3>
                <h1 className=' text-2xl font-semibold'>
                    Futuristic $21 Million Concrete Beach Fortress Designed To <br/> 
                    Withstand the Elements Becomes the Week’s Most Popular <br />
                    Home
                </h1>
                <div className=' px-2 py-1 border-2 rounded-xl cursor-pointer hover:text-blue-500 hover:border-blue-500'>
                    Read Articles
                </div>
            </div>
            <div className=' w-full absolute z-10 flex justify-center gap-2 h-[500px] opacity-80 bg-gray-800'></div>
            <div className=' w-full relative flex justify-center gap-2 h-[500px]'>
                <img
                    src={pic1}
                    alt="pic 1"
                    className=' w-[33%]'
                />
                <img
                    src={pic2}
                    alt="pic 1"
                    className=' w-[33%]'
                />
                <img
                    src={pic3}
                    alt="pic 1"
                    className=' w-[33%]'
                />

            </div>
        </div>
    )
}
