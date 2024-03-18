import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { getBookData, setBookData } from '../../utils/bookStorage';
import { getBorrower } from '../../utils/borrowerStorage';
import Select from 'react-select';
import { getIssueBook, setIssueBook } from '../../utils/IssueBookStorage';
import { useNavigate } from 'react-router-dom';

function IssueBookAdd() {
    const [booklist, setBookList] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [issueDate, setIssueDate] = useState();
    const [returnDate, setReturnDate] = useState();
    useEffect(() => {
        const allBooks = getBookData();
        const allusers = getBorrower();
        setBookList(allBooks);
        setUsers(allusers);
    }, []);
    const navigate = useNavigate();
    const handleChangeBook = (selectedOption) => {
        setSelectedOption(selectedOption.slice(-3));
    }
    const handleChangeUser = (selectedUser) => {
        setSelectedUser(selectedUser);
    }
    const issueBookAdd = () => {
        const newIssueBook = { selectedOption, selectedUser, issueDate, returnDate };
        const allIssueBooks = getIssueBook();
        const allBooks = getBookData();
        let hasBorrowedBooks = false;

        allIssueBooks.forEach(issue => {
            if (issue.selectedUser.value === selectedUser.value) {
                hasBorrowedBooks = true;
            }
        });

        if (hasBorrowedBooks) {
            alert("Please return your books before borrowing new ones.");
            return;
        }

        selectedOption.forEach(selectedBook => {
            const bookToUpdate = allBooks.find(book => book.bookName === selectedBook.value);
            if (bookToUpdate.available > 0) {
                bookToUpdate.available--;
            } else {
                alert(`${bookToUpdate.bookName} is not available`);
            }
        });


        newIssueBook['id'] = allIssueBooks.length + 1;
        allIssueBooks.push(newIssueBook);
        setIssueBook(allIssueBooks);
        setBookData(allBooks);
        navigate('/issuebook');
    };

    return (
        <div>
            <Sidebar />
            <div className="px-6 py-8 sm:ml-64">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search User</label>
                        <Select
                            className='my-5'
                            value={selectedUser}
                            onChange={handleChangeUser}
                            options={users.map(user => ({ value: user.userName, label: user.userName }))}
                        />
                    </div>
                    <div>
                        <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Books</label>
                        <Select
                            value={selectedOption}
                            onChange={handleChangeBook}
                            options={booklist.map(book => ({ value: book.bookName, label: book.bookName }))}
                            className="basic-multi-select my-5"
                            classNamePrefix="select"
                            isMulti
                        />
                    </div>
                    <div>
                        <label for="issue-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issue Date</label>
                        <input type="date" id="issue-date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {
                            setIssueDate(e.target.value)
                        }} />
                    </div>
                    <div>
                        <label for="return-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Return Date</label>
                        <input type="date" id="return-date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {
                            setReturnDate(e.target.value)
                        }} />
                    </div>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={issueBookAdd}>Submit</button>

                </div>
            </div>
        </div>
    )
}

export default IssueBookAdd;
