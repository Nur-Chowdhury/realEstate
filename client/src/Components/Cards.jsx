import React from 'react'
import {Link} from 'react-router-dom'


export default function Cards({item}) {
    return (
        <div className=' relative group w-[350px] h-[500px] shadow-custom-inset rounded-2xl m-8'>
            <div className=' absolute top-1 left-1 bottom-1 right-1 bg-blue-200 dark:bg-blue-800 shadow-lg rounded-2xl flex justify-center items-center
                transition duration-500 transform translate-y-0 group-hover:translate-y-[-50px] group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]
                group-hover:bg-gradient-to-br group-hover:from-[#4f29cd] group-hover:to-[#b95ce4]'>
                <div className=' p-2 text-center'>
                    <h1 className=' text-2xl font-medium transition duration-500 group-hover:text-green-400 pointer-events-none'>
                        {item.heading}
                    </h1>
                    <p>{item.para}</p>
                    <Link to={item.link}>Learn More</Link>
                </div>
            </div>
        </div>
    )
}
