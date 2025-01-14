import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme);
    return (
        <div className={theme}>
            <div className='bg-white text-black dark:bg-black dark:text-white min-h-screen'>
                {children} 
            </div> 
        </div>
    );
}