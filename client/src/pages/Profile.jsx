import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Components/Nav';
import { FaTrashAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { toast } from 'react-toastify';

export default function Profile() {

    const fileRef = useRef(null);
    const { currentUser, loading } = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        //console.log(storage, storageRef, uploadTask);
        console.log(file);
    
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.error("Upload failed:", error);
                toast.error("Error Image upload (image must be less than 2 mb)");
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setFormData((prevFormData) => ({ ...prevFormData, avatar: downloadURL }));
                    console.log("FormData updated:", formData);
                });
            }
        );
    };
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                toast.error(data.message);
                dispatch(updateUserFailure(data.message));
                return;
            }
            toast.success("Details Updated Successfully!");
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            toast.error(error.message);
            dispatch(updateUserFailure(error.message));
        }
    };
    
    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
                const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                toast.error(data.message);
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
            toast.success("User Deleted Successfully!");
            navigate('/');
        } catch (error) {
            toast.error(error.message);
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('/api/auth/signout');
            const data = await res.json();
            if (data.success === false) {
                toast.error(data.message);
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
            toast.success("Logged Out Successfully!")
            navigate('/');
        } catch (error) {
            toast.error(error.message);
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleShowListings = async () => {
        try {
            setShowListingsError(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                toast.error(data.message);
                setShowListingsError(true);
                return;
            }
            setUserListings(data);
        } catch (error) {
            toast.error(error.message);
            setShowListingsError(true);
        }
    };

    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                toast.error(data.message);
                return;
            }
            setUserListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <Nav />
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type='file'
                        ref={fileRef}
                        hidden
                        accept='image/*'
                    />
                    <img
                        onClick={() => fileRef.current.click()}
                        src={formData.avatar || currentUser.avatar}
                        alt='profile'
                        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border-4 border-green-500'
                    />
                    <p className='text-sm self-center'>
                    {fileUploadError ? (
                        <span className='text-red-700'>
                            Error Image upload (image must be less than 2 mb)
                        </span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                        <span className='text-green-700'>Image successfully uploaded!</span>
                    ) : (
                        ''
                    )}
                    </p>
                    <input
                        type='text'
                        placeholder='username'
                        defaultValue={currentUser.username}
                        id='username'
                        className='border-2 border-green-500 p-3 rounded-lg text-black'
                        onChange={handleChange}
                    />
                    <input
                        type='email'
                        placeholder='email'
                        id='email'
                        defaultValue={currentUser.email}
                        className='border-2 border-green-500 p-3 rounded-lg text-black'
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        placeholder='password'
                        onChange={handleChange}
                        id='password'
                        className=' border-2 border-green-500 p-3 rounded-lg text-black'
                    />
                    <button
                        disabled={loading}
                        className='bg-blue-700 border-2 border-blue-700 text-white text-lg font-semibold rounded-lg p-3 uppercase 
                        transition-all duration-300 hover:bg-transparent hover:text-blue-700 hover:scale-105 disabled:opacity-80'
                    >
                        {loading ? 'Loading...' : 'Update'}
                    </button>
                    <Link
                        className='bg-green-700 text-center border-2 border-green-700 text-white text-lg font-semibold rounded-lg p-3 
                        uppercase transition-all duration-300 hover:bg-transparent hover:text-green-700 hover:scale-105'
                        to={'/create-listing'}
                    >
                        Create Listing
                    </Link>
                </form>
                <div className='flex justify-between mt-5'>
                    <div onClick={handleDeleteUser} className=' px-4 py-2 bg-red-700 border-2 border-red-700 text-white text-lg 
                        font-semibold transition-colors duration-300 hover:bg-transparent hover:text-red-700 cursor-pointer flex justify-center 
                        items-center gap-2 rounded-lg'
                    >
                        <span>Delete Account</span><FaTrashAlt />
                    </div>
                    <div onClick={handleSignOut} className=' px-4 py-2 bg-red-700 border-2 border-red-700 text-white text-lg 
                        font-semibold transition-colors duration-300 hover:bg-transparent hover:text-red-700 cursor-pointer flex justify-center 
                        items-center gap-2 rounded-lg'
                    >
                        <span>Sign Out</span><FiLogOut />
                    </div>
                </div>
                <button onClick={handleShowListings} className='text-green-700 text-xl font-semibold w-full mt-2'>
                    Show Listings
                </button>

                {userListings && userListings.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-center mt-7 text-2xl font-semibold'>
                            Your Listings
                        </h1>
                        {userListings.map((listing) => (
                            <div
                                key={listing._id}
                                className='border rounded-lg p-3 flex justify-between items-center gap-4'
                            >
                                <Link to={`/listing/${listing._id}`}>
                                    <img
                                        src={listing.imageUrls[0]}
                                        alt='listing cover'
                                        className='h-16 w-16 object-contain'
                                    />
                                </Link>
                                <Link
                                    className='text-slate-700 dark:text-slate-300 font-semibold hover:underline truncate flex-1'
                                    to={`/listing/${listing._id}`}
                                >
                                    <p>{listing.name}</p>
                                </Link>

                                <div className='flex flex-col item-center'>
                                    <button
                                        onClick={() => handleListingDelete(listing._id)}
                                        className='text-red-500 uppercase'
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/update-listing/${listing._id}`}>
                                        <button className='text-green-500 uppercase'>Edit</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1 className='text-center mt-4 text-2xl font-semibold'>
                        No Listing to show!
                    </h1>
                )}

            </div>
        </div>
    )
}
