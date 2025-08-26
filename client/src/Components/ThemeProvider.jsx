import { useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { themeToggle } from '../redux/slices/themeSlice';

export default function ThemeProvider() {
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    
    const toggleTheme = () => {
        dispatch(themeToggle());
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <button
            className='h-10 inline'
            onClick={toggleTheme}
        >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
    );
}