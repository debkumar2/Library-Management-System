import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import { getBookData } from "../../utils/bookStorage";

function BookDetails() {
    const [selectedBook, setSelectedBook] = useState(null);
    const params = useParams();
    useEffect(() => {
        getDetails(params.id);
    }, []);
    const getDetails = (BookId) => {
        const allBooks = getBookData();
        // console.log(allBooks);
        const book = allBooks.find((bk) => {
            return bk.isbn == BookId;
        })
        setSelectedBook(book);
    }
    return (
        <>
            <Sidebar />
            <div className="px-6 py-8 sm:ml-64">
                <div className="mx-auto">
                    {selectedBook ?
                        <div className="flex justify-center">
                            <div className="right-side-image">
                                <img src={selectedBook.image} alt="" className="w-72 shadow-xl rounded-md" />
                            </div>
                            <div className="left-book-description pl-5 flex flex-col gap-3">
                                <h2 className="text-3xl font-bold">{selectedBook.bookName}</h2>
                                <p className="text-gray-600">By: <span className="text-black font-bold">{selectedBook.authorName}</span></p>
                                <p className="text-gray-600">ISBN: <span className="text-black font-bold">{selectedBook.isbn}</span></p>
                                <p className="text-gray-600">Category: <span className="text-black font-bold">{selectedBook.category}</span></p>
                                <p className="text-gray-600">Available Books: <span className="text-black font-bold">{selectedBook.available}</span></p>
                                <p className="text-gray-600">Book Description</p>
                                <h4 className="w-96 font-medium">{selectedBook.bookDescription}</h4>
                            </div>
                        </div>
                        :
                        <div>No Book Found</div>
                    }
                </div>
            </div>
        </>
    )
}
export default BookDetails;