import React from 'react'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
import { FaFacebookMessenger } from "react-icons/fa6";

export default function ContactUs() {
  return (
    <div>
        <div className=' my-4 text-center text-3xl font-semibold'>Contact Us</div>
        <div className=' glass px-6 max-w-[1000px] mx-auto flex flex-col md:flex-row place-items-center justify-between' id='contact'>
            <div className=' flex flex-col gap-4 py-2'>
                <h1 className=' text-xl'>Contact Us At:</h1>
                <div className=" flex gap-5">
                    <a href=''><AiFillLinkedin className=' text-blue-400' size={60}/></a>
                    <a href=''><FaFacebookMessenger size={60} className=' text-blue-600' /></a>
                </div>
            </div>
            <h1 className=' text-xl items-center justify-center'>OR,</h1>
            <div className=' md:w-3/5'>
                <form action="https://getform.io/f/pboxproa" method="POST" className='  p-5 md:p-12' id='form'>
                    <input 
                        type='text'
                        id='name'
                        placeholder='Your Name ...'
                        name='name'
                        className=' mb-2 w-full rounded border border-gray-400 py-2 pl-2 pr-4'
                    />
                    <input
                        required={true}
                        type='email'
                        id='email'
                        placeholder='Your Email ...'
                        name='email'
                        className=' mb-2 w-full rounded border border-gray-400 py-2 pl-2 pr-4'
                    />
                    <textarea
                        required={true}
                        name='textarea'
                        id='textarea'
                        cols="30"
                        rows="4"
                        placeholder='Your Message ...'
                        className=' mb-2 w-full rounded border border-gray-400 py-2 pl-2 pr-4' 
                    />
                    <button type='submit' className=' w-full py-3 rounded text-gray-200
                    font-semibold text-xl bg-gradient-to-r from-[#50a7c7] via-[#1f7c8f] to-[#3d6ca4]'
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
