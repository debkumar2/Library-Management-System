import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { getBookData, setBookData } from "../../utils/bookStorage";
import { FaEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Pagination from "../../utils/Pagination";
import Swal from "sweetalert2";

function BookList() {
    const navigate = useNavigate();
    useEffect(() => {
        const allBooks = getBookData();
        setBookList(allBooks);
        setFilteredBook(allBooks);
    }, []);
    const toAddBooks = () => {
        navigate('/books/add');
    }
    const toSeeView = (Id) => {
        navigate(`/books/${Id}`);
    }
    const [bookList, setBookList] = useState([]);
    const [filteredBook, setFilteredBook] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(6);

    const lastBookIndex = currentPage * booksPerPage;
    const firstBookIndex = lastBookIndex - booksPerPage;
    const currentBooks = filteredBook.slice(firstBookIndex, lastBookIndex);
    const filtering = (e) => {
        const search = e.target.value.toLowerCase();
        const filteredSearch = bookList.filter((filtered) => {
            return filtered.bookName.toLowerCase().includes(search) || filtered.authorName.toLowerCase().includes(search) || filtered.category.toLowerCase().includes(search) || filtered.isbn.toLowerCase().includes(search);
        });
        setFilteredBook(filteredSearch);
        setCurrentPage(1);
    }
    const openBookEdit = (bookId) => {
        navigate(`/book/edit/${bookId}`)
    }
    const toDeleteBooks = (bookId) => {
        const updatedBooks = bookList.filter((book) => {
            return book.isbn !== bookId;
        });
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Book has been deleted.",
                    icon: "success"
                });
                setBookData(updatedBooks);
                setFilteredBook(updatedBooks);
            }
        });
        navigate('/books');
    }
    return (
        <>
            <div className="">
                <Sidebar />
                <div className="px-6 py-8 sm:ml-64">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between mb-4">
                            <div>
                                <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" class="inline-flex items-center text-white bg-blue-600 border border-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={toAddBooks}>
                                    Add Book
                                </button>
                            </div>
                            <label for="table-search" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for books,isbn,author-name" onChange={filtering} />
                            </div>
                        </div>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-white uppercase bg-neutral-900 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="text-center">
                                    <th scope="col" class="px-6 py-3">
                                        Book Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        ISBN
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Author Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Available
                                    </th>
                                    <th scope="col" colSpan={3} align="center" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {/* {currentBooks.length > 0 ? */}
                            <tbody>
                                {currentBooks.map((book, index) => {
                                    return (
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center" key={index}>
                                            <td class="px-6 py-4">
                                                {book.bookName}
                                            </td>
                                            <td class="px-6 py-4">
                                                {book.isbn}
                                            </td>
                                            <td class="px-6 py-4">
                                                {book.authorName}
                                            </td>
                                            <td class="px-6 py-4">
                                                {book.category}
                                            </td>
                                            <td class="px-6 py-4">
                                                {book.available}
                                            </td>
                                            <td class="px-2 py-4">
                                                <button className="bg-blue-600 text-white p-2 rounded-md" onClick={() => {
                                                    toSeeView(book.isbn)
                                                }}><FaEye /></button>
                                            </td>
                                            <td class="px-2 py-4">
                                                <button className="bg-green-600 text-white p-2 rounded-md" onClick={() => {
                                                    openBookEdit(book.isbn)
                                                }}><FaRegPenToSquare /></button>
                                            </td>
                                            <td class="px-2 py-4">
                                                <button className="bg-red-600 text-white p-2 rounded-md" onClick={() => {
                                                    toDeleteBooks(book.isbn)
                                                }}><MdDelete /></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            {/* : <div className="text-black">
                                     <Lottie animationData={AnimationData} />
                                </div>
                            } */}
                        </table>
                    </div>
                    {filteredBook.length > 6 ?
                        < Pagination setCurrentPage={setCurrentPage} totalBooks={filteredBook.length} booksPerPage={booksPerPage} currentPage={currentPage} />
                        : null}
                </div>
            </div>
        </>
    )
}
export default BookList;