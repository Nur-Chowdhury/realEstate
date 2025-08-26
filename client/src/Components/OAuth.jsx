import React from 'react'
import {FcGoogle} from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';


function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
    
            const result = await signInWithPopup(auth, provider);

            console.log(result);
    
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log('could not sign in with google', error);
        }
    };
    
  return (
    <div className="flex justify-center items-center h-full w-full">
        <button
            className=" w-full bg-transparent text-black dark:text-white text-lg uppercase p-3 border-4 flex justify-center items-center 
            gap-4 font-medium tracking-widest cursor-pointer group rounded-full border-t-red-500 border-b-green-500 border-l-yellow-500 border-r-blue-500 transition-all duration-500 hover:scale-105"
            onClick={handleGoogleClick}
            type='button'
        >
            <FcGoogle className="text-3xl" />
            Login with Google
        </button>
    </div>

  );
}

export default OAuth;
