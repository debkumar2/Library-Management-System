import Lottie from "lottie-react";
import AnimationData from '../images/Animation - 1707757606123.json';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const login = localStorage.getItem('login');
        if (login) {
            navigate('/dashboard');
        }
    })
    const toMainPage = () => {
        if (email === 'Admin' && password === 'admin') {
            localStorage.setItem('login', true);
            navigate('/dashboard');
        }
    }
    return (
        <>
            <div className="h-screen" style={{ backgroundColor: '#2234ae', backgroundImage: 'linear-gradient(315deg, #2234ae 0%, #191714 74%)' }}>
                <div class="py-16">
                    <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                        <div class="hidden lg:block lg:w-1/2 bg-cover bg-indigo-200">
                            <Lottie animationData={AnimationData} />
                        </div>
                        <div class="w-full p-8 lg:w-1/2 flex flex-col justify-center">
                            <div className="mt-4">
                                <h2 className="text-4xl font-semibold">Sign In</h2>
                            </div>
                            <div class="mt-4">
                                <label class="block text-black text-sm font-bold mb-2">Email Address</label>
                                <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </div>
                            <div class="mt-4">
                                <div class="flex justify-between">
                                    <label class="block text-black text-sm font-bold mb-2">Password</label>
                                    <a href="#" class="text-xs text-gray-500">Forget Password?</a>
                                </div>
                                <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                            </div>
                            <div class="mt-8">
                                <button class="bg-sky-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-transparent hover:text-black hover:border-slate-950 border transition ease-in-out" onClick={toMainPage}>Login</button>
                            </div>
                            <div className="mt-8">
                                <h2 className="text-sm font-normal text-center">Don't have an account? <span className="text-red-600 font-semibold">Sign Up</span></h2>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}
export default Login;