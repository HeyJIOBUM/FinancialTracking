import {Inter} from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import {ReduxProvider} from "@/components/redux-provider";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
    subsets: ["latin"],
});

export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} w-full`}>
        <ReduxProvider>
            <Header/>
            <div className={"flex min-h-[calc(calc(100vh)-100px)] overflow-x-hidden"}>
                <Sidebar/>
                <main className={"ml-[200px] size-full"}>
                    <div className={"p-4"}>
                        {children}
                    </div>
                </main>
            </div>
        </ReduxProvider>
        <ToastContainer/>
        </body>
        </html>
    );
}
