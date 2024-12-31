import { Home, Settings, User, Wallet, TrendingDown, TrendingUp} from 'lucide-react';

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
            name: 'Profile',
            href: '/me',
            pathMatcher: (path) => path === '/me',
            icon: <User size={20} />,
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
