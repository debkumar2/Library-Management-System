import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

function BookList() {
    const navigate = useNavigate();
    const toAddBooks = () => {
        navigate('/books/add');
    }
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="px-5 py-7">
                    <h1>BookList</h1>
                    <button onClick={toAddBooks}>Add Books</button>
                </div>
            </div>
        </>
    )
}
export default BookList;