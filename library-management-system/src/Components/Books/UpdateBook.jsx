import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { getBookData, setBookData } from "../../utils/bookStorage";
import Swal from "sweetalert2";

function UpdateBook() {
    const navigate = useNavigate();
    const params = useParams();
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedCategory, setSelectedCategroy] = useState('');

    useEffect(() => {
        getBook(params.id);
    }, []);
    const getBook = (bookId) => {
        const allBooks = getBookData();
        const books = allBooks.find((bk) => {
            return bk.id == bookId;
        })
        setSelectedBook(books);
    }
    const updateBook = () => {
        const booklist = getBookData();
        let isUpdate = false;
        booklist.map((book, index) => {
            if (book.id === selectedBook.id) {
                booklist[index] = selectedBook;
                isUpdate = true;
                setBookData(booklist);
            }
        });
        if (isUpdate) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Updated",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Not Updated",
                showConfirmButton: false,
                timer: 1500
            });
        }
        navigate('/books');
    }
    return (
        <>
            <Sidebar />
            <div className="sm:ml-64">
                {selectedBook ? <div className="max-w-lg lg:ms-auto mx-auto">
                    <div className=" mt-4 py-12 px-7 rounded-lg bg-sky-100">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                            <div>
                                <label for="book_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Name</label>
                                <input type="text" id="book_name" name="book_name" placeholder="Book Name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" value={selectedBook.bookName}
                                    onChange={(e) => {
                                        setSelectedBook((currentBook) => {
                                            return { ...currentBook, ...{ bookName: e.target.value } }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <label for="author_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Name</label>
                                <input type="text" id="author_name" name="author_name" placeholder="Author Name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" value={selectedBook.authorName}
                                    onChange={(e) => {
                                        setSelectedBook((currentBook) => {
                                            return { ...currentBook, ...{ authorName: e.target.value } }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <label for="isbn_num" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ISBN Number</label>
                                <input type="number" id="isbn_num" name="isbn_num" placeholder="ISBN Number" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" value={selectedBook.isbn}
                                    onChange={(e) => {
                                        setSelectedBook((currentBook) => {
                                            return { ...currentBook, ...{ isbn: e.target.value } }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <label for="available" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available Books</label>
                                <input type="number" id="available" name="available" placeholder="Availability" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" value={selectedBook.available}
                                    onChange={(e) => {
                                        setSelectedBook((currentBook) => {
                                            return { ...currentBook, ...{ available: e.target.value } }
                                        })
                                    }}
                                />
                            </div>
                            {/* </div> */}
                            {/* <div className="md:col-span-2">
                                <label for="category" className="float-left block  font-normal text-black text-lg">Category</label>
                                <select id="category" name="category" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" value={selectedBook.category}
                                    onChange={(e) => {
                                        setSelectedCategroy(e.target.value)
                                    }}
                                >
                                    <option value="" disabled selected>Select Category</option>
                                    <option value="Science fiction">Science fiction</option>
                                    <option value="Mystery">Mystery</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Historical Fiction">Historical Fiction</option>
                                    <option value="Biography">Biography</option>
                                    <option value="Crime fiction">Crime fiction</option>
                                </select>
                            </div>*/}
                            <div className="md:col-span-2">
                                <input type="file" name="" id="" className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                            </div>
                            <div className="md:col-span-2">
                                <label for="isbn_num" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Description</label>
                                <textarea name="message" rows="4" cols="" placeholder="Description" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                                    onChange={(e) => {
                                        setSelectedBook((currentBook) => {
                                            return { ...currentBook, ...{ bookDescription: e.target.value } }
                                        })
                                    }}
                                >{selectedBook.bookDescription}</textarea>
                            </div>
                            <div className="md:col-span-2">
                                <button className="py-3 text-base font-medium rounded text-white bg-blue-800 w-full hover:bg-blue-700 transition duration-300" onClick={updateBook}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                    : null}
            </div>
        </>
    )
}
export default UpdateBook;