import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Nav from '../Components/Nav'
import { toast } from 'react-toastify';
import { supabase } from '../supabase';

export default function CreateListing() {

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filePerc, setFilePerc] = useState(0);

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            const promises = [];
    
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
            .then((urls) => {
                console.log(urls);
                setFormData({
                    ...formData,
                    imageUrls: formData.imageUrls.concat(urls),
                });
                setUploading(false);
            })
            .catch((err) => {
                toast.error('Image upload failed (2 mb max per image)');
                setUploading(false);
            });
        } else {
            toast.error('You can only upload 6 images per listing');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise(async (resolve, reject) => {
            if (file.size > 2 * 1024 * 1024) {
                return reject(new Error('File too large'));
            }

            const fileName = `${Date.now()}_${file.name}`;
            const { data: signedUrlData, error: signedUrlError } = await supabase.storage
                .from('img_bkt')
                .createSignedUploadUrl(fileName);

            if (signedUrlError) {
                console.log('Signed URL error:', signedUrlError.message);
                return reject(signedUrlError);
            }

            const uploadUrl = signedUrlData?.signedUrl;
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', uploadUrl, true);
            xhr.setRequestHeader('Content-Type', file.type);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    setFilePerc(percent);
                }
            };

            xhr.onload = async () => {
                if (xhr.status === 200) {
                    const { data: urlData, error: urlError } = supabase.storage
                        .from('img_bkt')
                        .getPublicUrl(fileName);

                    if (urlError) {
                        console.error('Public URL error:', urlError.message);
                        return reject(urlError);
                    }
                    resolve(urlData.publicUrl);
                } else {
                    console.log('Upload failed with status:', xhr.status);
                    reject(new Error(`Upload failed with status ${xhr.status}`));
                }
            };

            xhr.onerror = () => {
                console.log('XHR error during upload');
                reject(new Error('XHR upload error'));
            };
            xhr.send(file);
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }
    
        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }
    
        if (
            e.target.type === 'number' ||
            e.target.type === 'text' ||
            e.target.type === 'textarea'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1)
                return toast.error('You must upload at least one image');
            if (+formData.regularPrice <= formData.discountPrice)
                return toast.error('Discount price must be lower than regular price');
            setLoading(true);
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            toast.success('Listing Created Successfully!');
            navigate(`/listing/${data._id}`);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div >
            <Nav />
            <main className='p-3 max-w-4xl mx-auto'>
                <h1 className='text-3xl font-semibold text-center my-7'>
                    Create a Listing
                </h1>
                <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 sm:gap-12'>
                    <div className='flex flex-col gap-4 flex-1'>
                        <input
                            type='text'
                            placeholder='Name'
                            className='border p-3 rounded-lg text-black'
                            id='name'
                            maxLength='62'
                            minLength='10'
                            required
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <textarea
                            type='text'
                            placeholder='Description'
                            className='border p-3 rounded-lg text-black'
                            id='description'
                            required
                            onChange={handleChange}
                            value={formData.description}
                            rows="3"
                        />
                        <input
                            type='text'
                            placeholder='Address'
                            className='border p-3 rounded-lg text-black'
                            id='address'
                            required
                            onChange={handleChange}
                            value={formData.address}
                        />
                        <div className='flex gap-6 flex-wrap'>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='sale'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={formData.type === 'sale'}
                                />
                                <span>Sell</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='rent'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={formData.type === 'rent'}
                                />
                                <span>Rent</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='parking'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={formData.parking}
                                />
                                <span>Parking spot</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='furnished'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={formData.furnished}
                                />
                                <span>Furnished</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='offer'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={formData.offer}
                                />
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-6'>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='number'
                                    id='bedrooms'
                                    min='1'
                                    max='10'
                                    required
                                    className='p-3 border text-black border-gray-300 rounded-lg'
                                    onChange={handleChange}
                                    value={formData.bedrooms}
                                />
                                <p>Beds</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='number'
                                    id='bathrooms'
                                    min='1'
                                    max='10'
                                    required
                                    className='p-3 border text-black border-gray-300 rounded-lg'
                                    onChange={handleChange}
                                    value={formData.bathrooms}
                                />
                                <p>Baths</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='number'
                                    id='regularPrice'
                                    min='50'
                                    max='10000000'
                                    required
                                    className='p-3 text-black border border-gray-300 rounded-lg'
                                    onChange={handleChange}
                                    value={formData.regularPrice}
                                />
                                <div className='flex flex-col items-center'>
                                    <p>Regular price</p>
                                    {formData.type === 'rent' && (
                                    <span className='text-xs'>($ / month)</span>
                                    )}
                                </div>
                            </div>
                            {formData.offer && (
                                <div className='flex items-center gap-2'>
                                    <input
                                    type='number'
                                    id='discountPrice'
                                    min='0'
                                    max='10000000'
                                    required
                                    className='p-3 border text-black border-gray-300 rounded-lg'
                                    onChange={handleChange}
                                    value={formData.discountPrice}
                                    />
                                    <div className='flex flex-col items-center'>
                                        <p>Discounted price</p>

                                        {formData.type === 'rent' && (
                                            <span className='text-xs'>($ / month)</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col flex-1 gap-4'>
                        <p className='font-semibold'>
                            Images:
                            <span className='font-normal text-gray-600 dark:text-gray-300 ml-2'>
                                The first image will be the cover (max 6)
                            </span>
                        </p>
                        <div className='flex gap-4'>
                            <input
                                onChange={(e) => setFiles(e.target.files)}
                                className='p-3 border border-gray-300 rounded w-full'
                                type='file'
                                id='images'
                                accept='image/*'
                                multiple
                            />
                            <button
                                type='button'
                                disabled={uploading}
                                onClick={handleImageSubmit}
                                className='p-3 bg-green-700 text-white text-lg font-medium border-2 border-green-700 rounded uppercase 
                                hover:shadow-lg hover:bg-transparent hover:text-green-700 transition-all hover:scale-105 duration-500 disabled:opacity-80'
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                        {formData.imageUrls.length > 0 &&
                            formData.imageUrls.map((url, index) => (
                        <div
                            key={url}
                            className='flex justify-between p-3 border items-center'
                        >
                            <img
                                src={url}
                                alt='listing image'
                                className='w-20 h-20 object-contain rounded-lg'
                            />
                            <button
                                type='button'
                                onClick={() => handleRemoveImage(index)}
                                className='p-3 text-lg font-medium text-red-700 rounded-lg uppercase hover:opacity-75'
                            >
                                Delete
                            </button>
                        </div>
                        ))}
                        <button
                            disabled={loading || uploading}
                            className='p-3 bg-blue-700 text-white text-lg font-medium border-2 border-blue-700 rounded-lg uppercase 
                            hover:shadow-lg hover:bg-transparent hover:text-blue-700 transition-all hover:scale-105 duration-500 disabled:opacity-80'
                        >
                            {loading ? 'Creating...' : 'Create listing'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}
