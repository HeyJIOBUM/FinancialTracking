'use client';

import {CircleX} from 'lucide-react';

import {useState} from 'react';
import {useDispatch} from "react-redux";

import {logIn} from "@/redux/slices/auth-slice"
import {register, signIn} from "@/configuration/api/auth-api";

const AuthModal = ({isOpen, onClose, onAuthentication}) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const [isSignInForm, setIsSignInForm] = useState(true);

    const dispatch = useDispatch()

    const handleModalTypeToggle = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null);
    };

    const handleModalClose = () => {
        setErrorMessage(null);
        onClose();
    }

    const handleAuthentication = () => {
        setErrorMessage(null);
        onAuthentication();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const username = formData.get('username');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (!isSignInForm && confirmPassword !== password) {
            setErrorMessage("Passwords must be the same");
            return
        }

        const authFunction = isSignInForm ? signIn : register;

        const {statusCode, message} = await authFunction({username, password});
        if (statusCode === 200){
            dispatch(logIn(username));
            setErrorMessage(null);
            handleAuthentication();
        }
        else {
            setErrorMessage(message);
        }
    };

    const clearErrorMessage = () => {
        setErrorMessage(null);
    }

    return (
        <>
            {
                isOpen && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
                        <div className="relative max-w-screen-sm rounded bg-white p-6 pt-3 shadow-md">
                            <div className="grow pb-1 text-center text-xl">
                                {isSignInForm ? 'Sign in form' : 'Register form'}
                            </div>
                            {/*CloseButton*/}
                            <button
                                onClick={handleModalClose}
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
                                           onChange={clearErrorMessage}
                                           required/>
                                </div>
                                <div>
                                    <label className="mb-1 block text-black">
                                        Password
                                    </label>
                                    <input type="password"
                                           name="password"
                                           className="w-full rounded border px-3 py-2 text-black"
                                           onChange={clearErrorMessage}
                                           required/>
                                </div>
                                {!isSignInForm && (
                                    <div className="mt-4">
                                        <label className="mb-1 block text-black">
                                            Confirm password
                                        </label>
                                        <input type="password"
                                               name="confirmPassword"
                                               className="w-full rounded border px-3 py-2 text-black"
                                               onChange={clearErrorMessage}
                                               required/>
                                    </div>
                                )}
                                {/*Error message*/}
                                {errorMessage !== null && (
                                    <p className="mb-[-12px] mt-1 text-center text-xs text-red-600">
                                        {errorMessage}
                                    </p>
                                )}
                                <button type="submit"
                                        className="mt-4 rounded bg-black px-4 py-2 text-white transition duration-200 hover:bg-gray-800">
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