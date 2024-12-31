'use client';

import Image from 'next/image'
import Link from 'next/link';
import AuthModal from "@/components/auth-modal";

export default function Header() {
    return (
        <header className="sticky top-0 z-[1] flex h-16 items-center justify-between border-b bg-background px-8">
            <Link
                href="https://github.com/HeyJIOBUM/FinancialTracking"
                className="flex items-center gap-2 text-lg font-semibold"
            >
                <Image alt={"Git"} src={"/github.svg"} width={30} height={30} />
                <span>HeyJIOBUM FinancialTracking</span>
            </Link>

            <AuthModal/>
        </header>
    );
}