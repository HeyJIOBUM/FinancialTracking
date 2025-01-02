import {Home, NotebookText, Settings, TrendingDown, TrendingUp, Wallet} from 'lucide-react';
import Image from "next/image";

export const SidebarItems = () => {
    return [
        {
            name: 'Home',
            href: '/',
            pathMatcher: (path) => path === '/',
            icon: <Home size={20} />,
            position: 'top',
        },
        {
            name: 'Money flow',
            href: '/me',
            pathMatcher: (path) => path === '/me',
            icon: <Image alt={""} width={20} height={20} src={'/money-svgrepo-com.svg'}/>,
            position: 'top',
        },
        {
            name: 'Categories',
            href: '/me/categories',
            pathMatcher: (path) => path.startsWith('/me/categories'),
            icon: <NotebookText size={20} />,
            position: 'top',
        },
        {
            name: 'Budgets',
            href: '/me/budgets',
            pathMatcher: (path) => path.startsWith('/me/budgets'),
            icon: <Wallet color={"#2f73a7"} size={20} />,
            position: 'top',
        },
        {
            name: 'Expenses',
            href: '/me/expenses',
            pathMatcher: (path) => path.startsWith('/me/expenses'),
            icon: <TrendingDown color={"red"} size={20} />,
            position: 'top',
        },
        {
            name: 'Incomes',
            href: '/me/incomes',
            pathMatcher: (path) => path.startsWith('/me/incomes'),
            icon: <TrendingUp color={"green"} size={20} />,
            position: 'top',
        },
        {
            name: 'Settings',
            href: '/me/settings',
            pathMatcher: (path) => path.startsWith('/me/settings'),
            icon: <Settings size={20} />,
            position: 'bottom',
        },
    ];
};
