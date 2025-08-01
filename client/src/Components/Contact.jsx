import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
        try {
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            setLandlord(data);
        } catch (error) {
            console.log(error);
        }
        };
        fetchLandlord();
    }, [listing.userRef]);
    return (
        <>
            {landlord && (
                <div className='flex flex-col gap-2'>
                    <p>
                        Contact <span className='font-semibold'>{landlord.username}</span>{' '}
                        for{' '}
                        <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        name='message'
                        id='message'
                        rows='3'
                        value={message}
                        onChange={onChange}
                        placeholder='Enter your message here...'
                        className='w-full border p-3 rounded-lg text-black'
                    ></textarea>

                    <Link
                        to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                        className='bg-blue-700 border-2 border-blue-700 text-lg font-medium text-white rounded-lg uppercase 
                                    hover:bg-transparent hover:text-blue-700 hover:scale-105 transition-all duration-500 p-3 text-center'
                    >
                        Send Message          
                    </Link>
                </div>
            )}
        </>
    );
}