import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';
import Nav from '../Components/Nav'
import { toast } from 'react-toastify';

const customStyles = `
    .swiper-pagination-bullet {
        background-color: #BFDBFE; /* Default dot color */
    }
    .swiper-pagination-bullet-active {
        background-color: #3B82F6; /* Active dot color */
    }
`;

export default function Listing() {

    SwiperCore.use([Pagination, Autoplay]);   
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    toast.error("Error Fetching Listing! Please try again later.");
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
            } catch (error) {
                toast.error("Error Fetching Listing! Please try again later.");
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);

    return (
        <div>
            <Nav />
            <main>
                {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
                {listing && !loading && (
                    <div>
                        <style>{customStyles}</style>
                        <Swiper 
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 5000 }}
                        >
                            {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className='h-[550px]'
                                    style={{
                                        background: `url(${url}) center no-repeat`,
                                        backgroundSize: 'cover',
                                    }}
                                ></div>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                            <FaShare
                                className='text-slate-500'
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    setCopied(true);
                                    setTimeout(() => {
                                        setCopied(false);
                                    }, 2000);
                                }}
                            />
                        </div>
                        {copied && (
                            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 dark:bg-slate-800 p-2'>
                                Link copied!
                            </p>
                        )}
                        <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-2'>
                            <p className='text-2xl font-semibold'>
                                {listing.name} - ${' '}
                                {listing.offer
                                    ? listing.discountPrice.toLocaleString('en-US')
                                    : listing.regularPrice.toLocaleString('en-US')}
                                {listing.type === 'rent' && ' / month'}
                            </p>
                            <p className='flex items-center mt-6 gap-2 text-slate-600 dark:text-slate-300 text-lg font-medium'>
                                <FaMapMarkerAlt className='text-green-700' />
                                {listing.address}
                            </p>
                            <div className='flex gap-4'>
                                <p className='bg-red-900 w-full max-w-[200px] text-white text-lg font-medium text-center p-1 rounded-md'>
                                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                                </p>
                                {listing.offer && (
                                    <p className='bg-green-900 w-full max-w-[200px] text-white text-lg font-medium text-center p-1 rounded-md'>
                                        ${+listing.regularPrice - +listing.discountPrice} OFF
                                    </p>
                                )}
                            </div>
                            <p className='text-slate-800 dark:text-slate-200 text-lg'>
                                <span className='font-semibold'>Description - </span>
                                {listing.description}
                            </p>
                            <ul className='text-green-700 font-semibold text-base flex flex-wrap items-center gap-4 sm:gap-6'>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaBed className='text-lg' />
                                    {listing.bedrooms > 1
                                    ? `${listing.bedrooms} beds `
                                    : `${listing.bedrooms} bed `}
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaBath className='text-lg' />
                                    {listing.bathrooms > 1
                                    ? `${listing.bathrooms} baths `
                                    : `${listing.bathrooms} bath `}
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaParking className='text-lg' />
                                    {listing.parking ? 'Parking spot' : 'No Parking'}
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaChair className='text-lg' />
                                    {listing.furnished ? 'Furnished' : 'Unfurnished'}
                                </li>
                            </ul>
                            {currentUser && listing.userRef !== currentUser._id && !contact && (
                                <button
                                    onClick={() => setContact(true)}
                                    className='bg-green-700 border-2 border-green-700 text-xl font-semibold text-white rounded-lg uppercase 
                                    hover:bg-transparent hover:text-green-700 hover:scale-105 transition-all duration-500 p-3'
                                >
                                    Contact landlord
                                </button>
                            )}
                            {contact && <Contact listing={listing} />}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
