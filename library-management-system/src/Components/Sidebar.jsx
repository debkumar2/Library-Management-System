import { useNavigate } from 'react-router-dom';
import bookLogo from '../images/book.png';
function Sidebar() {
    const navigate = useNavigate();
    const toOpenBooks = () => {
        navigate('/books');
    }
    return (
        <>
            <aside className="flex flex-col w-64 min-h-screen px-5 py-8 overflow-y-auto bg-blue-950 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <a href="#" className="text-2xl text-white font-bold flex items-center">
                    <img src={bookLogo} alt="" />
                    <h4>Book Library</h4>
                </a>
                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav className="flex-1 -mx-3 space-y-3 ">
                        <a className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                            </svg>

                            <span className="mx-2 text-sm font-medium">Dashboard</span>
                        </a>

                        <a className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer" onClick={toOpenBooks}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5.5,20.5V4.5A2.5,2.5,0,0,1,8,2h8a2.5,2.5,0,0,1,2.5,2.5v16" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5.5,20.5s1.5-.75,3.5,0,4,0,5,0,3.5-.75,3.5,0" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5.5,16.5V8.5A2.5,2.5,0,0,1,8,6h8a2.5,2.5,0,0,1,2.5,2.5v8" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5.5,16.5s1.5-.75,3.5,0,4,0,5,0,3.5-.75,3.5,0" />
                            </svg>
                            <span className="mx-2 text-sm font-medium">Books</span>
                        </a>
                        <a className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>

                            <span className="mx-2 text-sm font-medium">Borrowers</span>
                        </a>
                    </nav>
                </div>
            </aside>
        </>
    )
}
export default Sidebar;