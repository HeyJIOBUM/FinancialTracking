"use client"

import {useSelector} from "react-redux";
import AuthModal from "@/components/auth-modal";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Loading from "@/components/loading";

export default function PassAuthenticatedUsersLayout({ children }) {
    const userData = useSelector((state) => state.authReducer.value);
    const isAuthenticated = userData.isAuthenticated;

    const [isModalOpen, setIsModalOpen] = useState(!isAuthenticated);
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
                <>
                    <Loading></Loading>
                </>
                <AuthModal isOpen={isModalOpen} onAuthentication={handleAuthentication} onClose={handleClose} />
            </>
        )
    );
}
