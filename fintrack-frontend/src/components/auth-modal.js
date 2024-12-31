'use client';

import {useState} from 'react';
import {CircleX} from 'lucide-react';
import {logIn, logOut} from "@/redux/slices/auth-slice"
import {useDispatch, useSelector} from "react-redux";
import {deleteTokenCookie} from "@/app/actions";

const AuthModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignInForm, setIsSignInForm] = useState(true);

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.authReducer.value);

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalTypeToggle = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        console.log('Form submitted:', { username: username, password: password, confirmPassword: confirmPassword });

        dispatch(logIn(username));
        setIsModalOpen(false);
    };

    const handleLogOut = (e) => {
        deleteTokenCookie().then(r => dispatch(logOut()));
    }

    return (
        <>
            {
                userData.isAuthenticated ? (
                    <button
                        className="text-lg font-semibold"
                        onClick={handleLogOut}>
                        Log out
                    </button>
                ) : (
                    <button
                        className="text-lg font-semibold"
                        onClick={handleModalOpenToggle}>
                        Sign in
                    </button>
                )
            }
            {
                isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                        <div className="relative rounded bg-white p-6 pt-3 shadow-md">
                            <div className="grow pb-1 text-center text-xl">
                                {isSignInForm ? 'Sign in form' : 'Register form'}
                            </div>
                            {/*CloseButton*/}
                            <button
                                onClick={handleModalOpenToggle}
                                aria-label="Close"
                                className="absolute right-2 top-[13px]"
                            >
                                <CircleX strokeWidth={1}/>
                            </button>

                            {/*AuthForm*/}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="mb-1 block text-black">
                                        Username
                                    </label>
                                    <input type="text"
                                           name="username"
                                           className="w-full rounded border px-3 py-2 text-black"
                                           required/>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-1 block text-black">
                                        Password
                                    </label>
                                    <input type="password"
                                           name="password"
                                           className="w-full rounded border px-3 py-2 text-black"
                                           required/>
                                </div>
                                {!isSignInForm && (
                                    <div className="mb-4">
                                        <label className="mb-1 block text-black">
                                            Confirm password
                                        </label>
                                        <input type="password"
                                               name="confirmPassword"
                                               className="w-full rounded border px-3 py-2 text-black"
                                               required/>
                                    </div>
                                )}
                                <button type="submit"
                                        className="rounded bg-black px-4 py-2 text-white transition duration-200 hover:bg-gray-800">
                                    Submit
                                </button>
                            </form>
                            <p className="mt-4">
                                {isSignInForm ? 'Don\'t have an account? ' : 'Already have an account? '}
                                <button onClick={handleModalTypeToggle} className="text-gray-600 hover:underline">
                                    {isSignInForm ? 'Register' : 'Sign in'}
                                </button>
                            </p>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default AuthModal;
