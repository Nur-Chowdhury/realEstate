import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../Components/ListingItem';
import Nav from '../Components/Nav';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [visibleListings, setVisibleListings] = useState(6);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            console.log(data.length);
            if (data.length > 6) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
            setListings(data);
            setLoading(false);
        };
        fetchListings();
    }, [location.search]);

    const handleChange = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'rent' ||
            e.target.id === 'sale'
        ) {
            setSidebardata({ ...sidebardata, type: e.target.id });
        }
        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }
        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setSidebardata({
                ...sidebardata,
                [e.target.id]:
                e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        const newVisibleListings = visibleListings + 6;
        setVisibleListings(newVisibleListings);

        if (newVisibleListings >= listings.length) {
            setShowMore(false);
        }
    };

    return (
        <div>
            <Nav />
            <div className='flex flex-col md:flex-row'>
                <div className='p-5  border-b-2 md:border-r-2 md:border-green-500 md:min-h-screen'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                        <div className='flex items-center gap-2'>
                            <label className='whitespace-nowrap font-semibold'>
                                Search Term:
                            </label>
                            <input
                                type='text'
                                id='searchTerm'
                                placeholder='Search...'
                                className='border rounded-lg p-3 w-full text-black'
                                value={sidebardata.searchTerm}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex gap-2 flex-wrap items-center'>
                            <label className='font-semibold'>Type:</label>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='all'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.type === 'all'}
                                />
                                <span>Rent & Sale</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='rent'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.type === 'rent'}
                                />
                                <span>Rent</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='sale'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.type === 'sale'}
                                />
                                <span>Sale</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='offer'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.offer}
                                />
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className='flex gap-2 flex-wrap items-center'>
                            <label className='font-semibold'>Amenities:</label>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='parking'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.parking}
                                />
                                <span>Parking</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='furnished'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.furnished}
                                />
                                <span>Furnished</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label className='font-semibold'>Sort:</label>
                            <select
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            id='sort_order'
                            className='border rounded-lg p-3 text-black'
                            >
                                <option value='regularPrice_desc'>Price high to low</option>
                                <option value='regularPrice_asc'>Price low to hight</option>
                                <option value='createdAt_desc'>Latest</option>
                                <option value='createdAt_asc'>Oldest</option>
                            </select>
                        </div>
                        <button className='bg-blue-700 border-2 border-blue-700 text-white text-xl font-semibold p-3 rounded-lg uppercase 
                        hover:bg-transparent hover:text-blue-700 hover:scale-105 transition-all duration-500'>
                            Search
                        </button>
                    </form>
                </div>
                <div className='flex-1'>
                    <h1 className='text-3xl font-semibold border-b-2 border-green-500 p-3 text-slate-700 dark:text-slate-200 mt-2'>
                        Listing results:
                    </h1>
                    <div className='p-7 flex flex-wrap gap-4'>
                        {!loading && listings.length === 0 && (
                            <p className='text-xl text-slate-700'>No listing found!</p>
                        )}
                        {loading && (
                            <p className='text-xl text-slate-700 text-center w-full'>
                            Loading...
                            </p>
                        )}

                        {!loading && listings && listings.slice(0, visibleListings).map((listing) => (
                            <ListingItem key={listing._id} listing={listing} />
                        ))}

                        {showMore && (
                            <button
                                onClick={onShowMoreClick}
                                className='text-green-700 hover:underline p-7 text-lg font-medium text-center w-full'
                            >
                                Show more
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}