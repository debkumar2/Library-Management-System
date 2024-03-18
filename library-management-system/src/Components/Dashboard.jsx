import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBookData } from "../utils/bookStorage";
import { useNavigate } from "react-router-dom";
import { getBorrower } from "../utils/borrowerStorage";

function Dashboard() {
    const navigate = useNavigate();
    const [allBooksCard, setAllBooksCard] = useState([]);
    const [allBorrowers, setAllBorrowers] = useState([]);
    const notify = () => toast.success('Login Successful', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
    useEffect(() => {
        const allBooks = getBookData();
        const allBorrowerTable = getBorrower();
        setAllBooksCard(allBooks);
        setAllBorrowers(allBorrowerTable);
        // notify();
    }, []);
    const firstFiveBooks = allBooksCard.slice(0, 5);
    const firstFiveBorrower = allBorrowers.slice(0, 5);
    const toBookList = () => {
        navigate('/books');
    }
    const toBorrowerlist = () => {
        navigate('/borrower');
    }
    return (
        <div>
            <Sidebar />
            {/* <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition:Bounce
            /> */}
            <div className="px-6 py-8 sm:ml-64">
                <h3 className="text-2xl font-semibold py-4">Book List</h3>
                {firstFiveBooks.length > 0 ?
                    <div className="flex flex-row gap-4">
                        {
                            firstFiveBooks.map((book, index) => {
                                return (
                                    <div class="max-w-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <a href="#" className="block w-full h-52">
                                            <img class="rounded-t-lg" src={book.image} alt="" className="w-full h-full object-cover object-center" />
                                        </a>
                                        <div class="p-5">
                                            <a href="#">
                                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.bookName}</h5>
                                            </a>
                                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.authorName}</p>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                    : null}
                <div className="flex justify-end mt-2">
                    <button className="px-4 py-2 bg-indigo-600 rounded-md text-white font-medium" onClick={toBookList}>See More</button>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold py-4">Borrowers</h3>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-neutral-900 dark:bg-gray-700 dark:text-gray-400">
                            <tr className="text-center">
                                <th scope="col" className="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Contact
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {firstFiveBorrower.map((borrower, index) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                                        <td className="px-6 py-4">
                                            {borrower.firstName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {borrower.lastName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {borrower.userName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {borrower.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {borrower.contact}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-2">
                        <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md" onClick={toBookList}>See More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;