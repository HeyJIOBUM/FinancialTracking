'use client';

import {useState} from 'react';
import {CircleX} from 'lucide-react';

const AuthModal = ({isOpen, onClose}) => {
    const [isSignIn, setIsSignIn] = useState(true);

    const handleToggle = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <div className="relative rounded bg-white p-6 pt-3 shadow-md">
                    <div className="grow pb-1 text-center text-xl">
                        {isSignIn ? 'Sign in form' : 'Register form'}
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-2 top-[13px]"
                    >
                        <CircleX strokeWidth={1}/>
                    </button>

                    <form>
                        <div className="mb-4">
                            <label className="mb-2 block text-black" htmlFor="login">
                                Login
                            </label>
                            <input type="text"
                                   id="login"
                                   className="w-full rounded border px-3 py-2 text-black"
                                   required/>
                        </div>
                        <div className="mb-4">
                            <label className="mb-2 block text-black" htmlFor="password">
                                Password
                            </label>
                            <input type="password"
                                   id="password"
                                   className="w-full rounded border px-3 py-2 text-black"
                                   required/>
                        </div>
                        {!isSignIn && (
                            <div className="mb-4">
                                <label className="mb-2 block text-black" htmlFor="confirm-password">
                                    Confirm password
                                </label>
                                <input type="password" id="confirm-password"
                                       className="w-full rounded border px-3 py-2 text-black" required/>
                            </div>
                        )}
                        <button type="submit"
                                className="rounded bg-black px-4 py-2 text-white transition duration-200 hover:bg-gray-800">
                            Submit
                        </button>
                    </form>
                    <p className="mt-4">
                        {isSignIn ? 'Don\'t have an account? ' : 'Already have an account? '}
                        <button onClick={handleToggle} className="text-gray-600 hover:underline">
                            {isSignIn ? 'Register' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        )
    );
};

export default AuthModal;
