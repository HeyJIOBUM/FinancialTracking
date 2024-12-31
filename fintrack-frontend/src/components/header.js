'use client';

import Image from 'next/image'
import Link from 'next/link';
import AuthModal from "@/components/auth-modal";

import {deleteTokenCookie} from "@/app/actions";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "@/redux/slices/auth-slice"
import {useState} from "react";

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.authReducer.value);

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleLogOut = () => {
        deleteTokenCookie().then(() => dispatch(logOut()));
    }

    return (
        <header className="sticky top-0 z-[1] flex h-16 items-center justify-between border-b bg-background px-8">
            <Link
                href="https://github.com/HeyJIOBUM/FinancialTracking"
                className="flex items-center gap-2 text-lg font-semibold"
            >
                <Image alt={"Git"} src={"/github.svg"} width={30} height={30} />
                <span>HeyJIOBUM FinancialTracking</span>
            </Link>

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

            <AuthModal isOpen={isModalOpen} onClose={handleModalOpenToggle} onAuthentication={handleModalOpenToggle}/>
        </header>
    );
}