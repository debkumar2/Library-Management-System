import { useState } from "react";
import Dashboard from "../Dashboard";
import Sidebar from "../Sidebar";
import { getBookData, setBookData } from "../../utils/bookStorage";
import { useNavigate } from "react-router-dom";

function AddBook() {
    const navigate = useNavigate();

    const [bookName, setBookName] = useState('');
    const [bookNameError, setBookNameError] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorNameError, setAuthorNameError] = useState('');
    const [isbn, setIsbn] = useState('');
    const [isbnError, setIsbnError] = useState('');
    const [available, setAvailable] = useState()
    const [availableError, setAvailableError] = useState('')
    const [category, setCategory] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookDescriptionError, setBookDescriptionError] = useState('');
    const [image, setImage] = useState(null);

    const validateForm = (newBook) => {
        let isValidForm = true;
        if (newBook.bookName.length < 1) {
            setBookNameError('Please Enter a book name');
            isValidForm = false;
        }
        if (newBook.authorName.length < 1) {
            setAuthorNameError('Please Enter an author name');
            isValidForm = false;
        }
        if (newBook.isbn.length < 13 || newBook.isbn.length > 13) {
            setIsbnError('Please enter a valid 13 digit ISBN number');
            isValidForm = false;
        }
        if (newBook.available.length < 1) {
            setAvailableError('Plese enter a valid quantity');
            isValidForm = false;
        }
        if (newBook.bookDescription.length < 1) {
            setBookDescriptionError('Please Enter book description');
            isValidForm = false;
        }
        return isValidForm;
    }
    const closeForm = () => {
        navigate('/books');
    }
    const handleImage = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();

        reader.onload = () => {
            const imageDataUrl = reader.result;
            setImage(imageDataUrl);
            localStorage.setItem('bookImage', imageDataUrl);
        }
        reader.readAsDataURL(file);
    }
    const addBook = () => {
        const newBook = { bookName, authorName, isbn, available, category, bookDescription }
        if (validateForm(newBook)) {
            const allBooks = getBookData();
            newBook['id'] = allBooks.length + 1;
            newBook['image'] = localStorage.getItem('bookImage');
            allBooks.push(newBook);
            setBookData(allBooks);
            closeForm();
        }
    }

    return (
        <>
            <div className="">
                <Sidebar />
                <div className="sm:ml-64">
                    <div className="max-w-lg lg:ms-auto mx-auto text-center">
                        <div className=" mt-4 py-12 px-7 rounded-lg bg-sky-100">
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                <input type="text" id="book_name" name="book_name" placeholder="Book Name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={(e) => {
                                    setBookName(e.target.value)
                                    setBookNameError('')
                                }} />
                                <input type="text" id="author_name" name="author_name" placeholder="Author Name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={(e) => {
                                    setAuthorName(e.target.value)
                                    setAuthorNameError('')
                                }} />
                                <p style={{ color: 'red', padding: '10px 0' }}>{bookNameError}</p>
                                <p style={{ color: 'red', padding: '10px 0' }}>{authorNameError}</p>
                                {/* <div className="md:col-span-2"> */}
                                <input type="number" id="isbn_num" name="isbn_num" placeholder="ISBN Number" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={(e) => {
                                    setIsbn(e.target.value)
                                    setIsbnError('')
                                }} />
                                <input type="number" id="available" name="available" placeholder="Availability" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={(e) => {
                                    setAvailable(e.target.value)
                                    setAuthorNameError('')
                                }} />
                                <p style={{ color: 'red', padding: '10px 0' }}>{isbnError}</p>
                                <p style={{ color: 'red', padding: '10px 0' }}>{availableError}</p>
                                {/* </div> */}
                                <div className="md:col-span-2">
                                    <label for="category" className="float-left block  font-normal text-black text-lg">Category</label>
                                    <select id="category" name="category" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={(e) => {
                                        setCategory(e.target.value)
                                    }}>
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
                                </div>
                                <div className="md:col-span-2">
                                    <input type="file" name="" id="" className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={handleImage} />
                                </div>
                                <div className="md:col-span-2">
                                    <textarea name="message" rows="4" cols="" placeholder="Description" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={(e) => {
                                        setBookDescription(e.target.value)
                                        setBookDescriptionError('')
                                    }}></textarea>
                                    <p style={{ color: 'red', padding: '10px 0' }}>{bookDescriptionError}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <button className="py-3 text-base font-medium rounded text-white bg-blue-800 w-full hover:bg-blue-700 transition duration-300" onClick={addBook}>Add Book</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddBook;