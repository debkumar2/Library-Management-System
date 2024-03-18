import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Pagination from '../../utils/Pagination';
import { useNavigate } from 'react-router-dom';
import { getIssueBook, setIssueBook } from '../../utils/IssueBookStorage';
import { getBookData, setBookData } from '../../utils/bookStorage';
import Swal from 'sweetalert2';

function IssueBookList() {
    const [bookList, setBookList] = useState([]);
    useEffect(() => {
        const allIssueBook = getIssueBook();
        setBookList(allIssueBook);
    }, []);
    const navigate = useNavigate();
    const toAddIssueBook = () => {
        navigate('/issuebook/add');
    }
    const returnBook = (borrowerIndex, bookIndex) => {
        const updatedBookList = [...bookList];
        const returnedBook = updatedBookList[borrowerIndex].selectedOption[bookIndex];

        // Increment available count for the returned book
        const bookData = getBookData();
        const bookToUpdate = bookData.find(book => book.bookName === returnedBook.value);
        if (bookToUpdate) {
            bookToUpdate.available++;
            setBookData(bookData);
        }
        updatedBookList[borrowerIndex].selectedOption.splice(bookIndex, 1);
        if (updatedBookList[borrowerIndex].selectedOption.length === 0) {
            updatedBookList.splice(borrowerIndex, 1);

        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, return it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Returned Book!",
                    text: "Book has been return.",
                    icon: "success"
                });
                setBookList(updatedBookList);
                setIssueBook(updatedBookList);
            }
        });
    };
    return (
        <>
            <Sidebar />
            <div className="px-6 py-8 sm:ml-64">
                <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between mb-4">
                    <div>
                        <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" class="inline-flex items-center text-white bg-blue-600 border border-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={toAddIssueBook}>
                            Add Issue Book
                        </button>
                    </div>
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for username,search" />
                    </div>
                </div>
                <div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-neutral-900 dark:bg-gray-700 dark:text-gray-400">
                            <tr className="text-center">
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Books
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Issue Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Return Date
                                </th>
                                <th scope="col" colSpan={3} align="center" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map((issueBook, borrowerIndex) => (
                                issueBook.selectedOption.map((book, bookIndex) => (
                                    <tr key={`${borrowerIndex}-${bookIndex}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                                        <td className="px-6 py-4">
                                            {issueBook.selectedUser.value}
                                        </td>
                                        <td className="px-6 py-4">
                                            {book.value}
                                        </td>
                                        <td className="px-6 py-4">
                                            {issueBook.issueDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {issueBook.returnDate}
                                        </td>
                                        <td className="px-2 py-4">
                                            <button className="bg-red-600 text-white p-2 rounded-md" onClick={() => returnBook(borrowerIndex, bookIndex)}>Return Book</button>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default IssueBookList;
