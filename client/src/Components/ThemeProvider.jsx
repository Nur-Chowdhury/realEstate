import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import { themeToggle } from '../redux/slices/themeSlice';


export default function ThemeProvider() {
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(themeToggle(newTheme));
        // localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <button
            className='h-10 inline'
            color='gray'
            pill
            onClick={toggleTheme}
        >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button> 
    );
}