"use client"

import {useSelector} from "react-redux";
import AuthModal from "@/components/auth-modal";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function PassAuthenticatedUsersLayout({ children }) {
    const userData = useSelector((state) => state.authReducer.value);
    const isAuthenticated = userData.isAuthenticated;

    const [_, setIsModalOpen] = useState(!isAuthenticated);
    const router = useRouter();

    const handleAuthentication = () => {
        setIsModalOpen(false);
    }

    const handleClose = () => {
        router.push("/");
    }

    return (
        isAuthenticated ? (
            children
        ) : (
            <>
                <div className={"h-[calc(calc(100vh)-96px)] w-full rounded-xl bg-gray-200"} />
                <AuthModal isOpen={true} onAuthentication={handleAuthentication} onClose={handleClose}/>
            </>
        )
    );
}
