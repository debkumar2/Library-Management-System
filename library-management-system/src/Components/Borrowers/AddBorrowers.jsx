import { useState } from "react";
import Sidebar from "../Sidebar"
import { getBorrower, setBorrower } from "../../utils/borrowerStorage";
import { useNavigate } from "react-router-dom";

function AddBorrowers() {
    const [userName, setUserName] = useState('');
    const [errorUserName, setErrorUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [errorFirstName, setErrorFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorLastName, setErrorLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [contact, setContact] = useState();
    const [errorConatct, setErrorContact] = useState('');
    const [userNameChecked, setUserNameChecked] = useState(false);
    const navigate = useNavigate();

    const addNewBorrower = () => {
        const newBorrower = { firstName, lastName, email, userName, contact }
        if (validateBorrower(newBorrower)) {
            const allBorrower = getBorrower();
            newBorrower['id'] = allBorrower.length + 1;
            allBorrower.push(newBorrower);
            setBorrower(allBorrower);
            navigate('/borrower');
        }
    }
    const userNameValidation = (e) => {
        const allBorrower = getBorrower();
        const myUserName = e.target.value;
        const existingUser = allBorrower.find(borrower => borrower.userName === myUserName);
        if (existingUser) {
            setErrorUserName('Username already exists');
        }
        else {
            setErrorUserName('');
            setUserNameChecked(true);
            setUserName(myUserName);
        }
    }
    const validateBorrower = (newBorrower) => {
        const emailVal = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        let isValidForm = true;
        if (newBorrower.firstName.length < 1) {
            setErrorFirstName('Please Enter FirstName');
            isValidForm = false;
        }
        if (newBorrower.lastName.length < 1) {
            setErrorLastName('Please Enter LastName');
            isValidForm = false;
        }
        if (!emailVal.test(newBorrower.email)) {
            setErrorEmail('Please Enter Valid Email');
            isValidForm = false;
        }
        if (newBorrower.contact.length !== 10 || !(newBorrower.contact.startsWith('9') || newBorrower.contact.startsWith('8') || newBorrower.contact.startsWith('7') || newBorrower.contact.startsWith('6'))) {
            setErrorContact('Please enter a valid number');
            isValidForm = false;
        }
        return isValidForm;
    }
    return (
        <>
            <Sidebar />
            <div className="sm:ml-64">
                <div className="max-w-lg lg:ms-auto mx-auto text-center">
                    <div className=" mt-4 py-12 px-7 rounded-lg bg-sky-100">
                        <div className="grid grid-cols-1 mb-5">
                            <div>
                                <label htmlFor="first_name" className="block mb-2 text-md text-left font-medium text-gray-900 dark:text-white">First Name</label>
                                <input type="text" id="first_name" name="first_name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={(e) => {
                                    setFirstName(e.target.value);
                                    setErrorFirstName('')
                                }} />
                                <p style={{ color: 'red', padding: '5px 0' }}>{errorFirstName}</p>

                            </div>
                        </div>
                        <div className="grid grid-cols-1 my-10">
                            <div>
                                <label htmlFor="last_name" className="block mb-2 text-md text-left font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input type="text" id="last_name" name="last_name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={(e) => {
                                    setLastName(e.target.value);
                                    setErrorLastName('')
                                }} />
                                <p style={{ color: 'red', padding: '5px 0' }}>{errorLastName}</p>

                            </div>
                        </div>
                        <div className="grid grid-cols-1 my-10">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-md text-left font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrorEmail('')
                                }} />
                                <p style={{ color: 'red', padding: '5px 0' }}>{errorEmail}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 my-10">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-md text-left font-medium text-gray-900 dark:text-white">Username</label>
                                <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={userNameValidation} />
                                {userNameChecked && !errorUserName && <p style={{ color: 'green', padding: '5px 0' }}>Username is available</p>}
                                {errorUserName && <p style={{ color: 'red', padding: '5px 0' }}>{errorUserName}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 my-10">
                            <div>
                                <label htmlFor="contactnumber" className="block mb-2 text-md text-left font-medium text-gray-900 dark:text-white">Contact Number</label>
                                <input type="number" id="contactnumber" name="contactnumber" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" onChange={(e) => {
                                    setContact(e.target.value);
                                    setErrorContact('')
                                }} />
                                <p style={{ color: 'red', padding: '5px 0' }}>{errorConatct}</p>
                            </div>
                        </div>
                        {userNameChecked && errorUserName ? (
                            <div className="md:col-span-2">
                                <button className="py-3 text-base font-medium rounded text-black bg-gray-300  w-full transition duration-300 cursor-not-allowed" disabled onClick={addNewBorrower}>Add Borrower</button>
                            </div>
                        ) :
                            <div className="md:col-span-2">
                                <button className="py-3 text-base font-medium rounded text-white bg-blue-800 w-full hover:bg-blue-700 transition duration-300" onClick={addNewBorrower}>Add Borrower</button>
                            </div>
                        }
                    </div>
                </div>
            </div >
        </>
    )
}
export default AddBorrowers;