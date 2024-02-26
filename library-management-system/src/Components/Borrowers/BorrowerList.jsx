import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { getBorrower } from '../../utils/borrowerStorage';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../utils/Pagination';

function BorrowerList() {
    useEffect(() => {
        const allBorrower = getBorrower();
        setBorrowerList(allBorrower);
        setFilteredBorrower(allBorrower);
    }, []);
    const [borrowerList, setBorrowerList] = useState([]);
    const [filteredBorrower, setFilteredBorrower] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [borrowerPerPage, setborrowerPerPage] = useState(8);

    const lastBorrowerIndex = currentPage * borrowerPerPage;
    const firstBorrowerIndex = lastBorrowerIndex - borrowerPerPage;
    const currentBorrower = filteredBorrower.slice(firstBorrowerIndex, lastBorrowerIndex);
    const filtering = (e) => {
        const search = e.target.value.toLowerCase();
        const filteredSearch = borrowerList.filter((filtered) => {
            return filtered.userName.toLowerCase().includes(search) || filtered.email.toLowerCase().includes(search) || filtered.firstName.toLowerCase().includes(search) || filtered.lastName.toLowerCase().includes(search);
        });
        setFilteredBorrower(filteredSearch);
        setCurrentPage(1);
    }
    const navigate = useNavigate();
    const toAddBorrower = () => {
        navigate('/borrower/add');
    }

    return (
        <>
            <Sidebar />
            <div className="px-6 py-8 sm:ml-64">
                <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between mb-4">
                    <div>
                        <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" class="inline-flex items-center text-white bg-blue-600 border border-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={toAddBorrower}>
                            Add Borrower
                        </button>
                    </div>
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for borrower" onChange={filtering} />
                    </div>
                </div>
                <div>
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
                                <th scope="col" colSpan={3} align="center" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBorrower.map((borrower, index) => {
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
                                        <td className="px-2 py-4">
                                            <button className="bg-blue-600 text-white p-2 rounded-md"></button>
                                        </td>
                                        <td className="px-2 py-4">
                                            <button className="bg-green-600 text-white p-2 rounded-md" ></button>
                                        </td>
                                        <td className="px-2 py-4">
                                            <button className="bg-red-600 text-white p-2 rounded-md" ></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {filteredBorrower.length > 8 ?
                        < Pagination setCurrentPage={setCurrentPage} totalBooks={filteredBorrower.length} booksPerPage={borrowerPerPage} currentPage={currentPage} />
                        : null}
                </div>
            </div>
        </>
    )
}

export default BorrowerList
