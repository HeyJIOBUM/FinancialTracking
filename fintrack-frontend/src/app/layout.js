import {Inter} from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import {ReduxProvider} from "@/components/redux-provider";

const inter = Inter({
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
        <ReduxProvider>
            <Header/>
            <div className={"flex"}>
                <Sidebar/>
                <main className={"ml-[200px]"}>
                    <div className={"p-4"}>
                        {children}
                    </div>
                </main>
            </div>
        </ReduxProvider>
        </body>
        </html>
    );
}
