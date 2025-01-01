'use client';

import {SidebarItems} from "@/configuration/sidebar-items";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {twMerge} from "tailwind-merge"

export default function Sidebar() {
    const currentPath = usePathname();
    const navigationItems = SidebarItems();

    return (
        <div className={"fixed h-full w-[200px] border-r pb-[70px]"}>
            <nav className="flex size-full columns-1 flex-col justify-between overflow-x-hidden break-words p-4">
                {/*TopItems*/}
                <div className="flex flex-col space-y-2">
                    {navigationItems.map((item, idx) => {
                        if (item.position === 'top') {
                            return (
                                <div key={idx}>
                                    <SideNavItem
                                        label={item.name}
                                        icon={item.icon}
                                        path={item.href}
                                        isActive={item.pathMatcher(currentPath)}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
                {/*BottomItems*/}
                <div className="flex flex-col space-y-2">
                    {navigationItems.map((item, idx) => {
                        if (item.position === 'bottom') {
                            return (
                                <div key={idx}>
                                    <SideNavItem
                                        label={item.name}
                                        icon={item.icon}
                                        path={item.href}
                                        isActive={item.pathMatcher(currentPath)}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
            </nav>
        </div>);
}

export const SideNavItem = ({label, icon, path, isActive}) => {
    return (
        <>
            <Link
                href={path}
                className={
                    twMerge(
                    "flex flex-row items-center px-2 text-sm py-1.5 space-x-2",
                        isActive ? "bg-blue-100" : "",
                    )
            }
                    >
                {icon}
                <span>{label}</span>
            </Link>
        </>
    );
};