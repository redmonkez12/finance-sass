"use client";

import { usePathname, useRouter } from "next/navigation";
import { NavButton } from "@/components/nav-button";
import { useState } from "react";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const routes = [
    {
        href: "/",
        label: "Overview",
    },
    {
        href: "/transactions",
        label: "Transactions",
    },
    {
        href: "/accounts",
        label: "Accounts",
    },
    {
        href: "/categories",
        label: "Categories",
    },
    {
        href: "/settings",
        label: "Settings",
    },
];

export function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const isMobile = useMedia("(max-width: 1024px)", false);

    function onClick(href: string) {
        router.push(href);
        setIsOpen(false);
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal bg-white/10 hover:bg-white/20 focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition border-none"
                    >
                        <Menu className="h-4 w-4"/>
                    </Button>

                    <SheetContent side="left" className="px-2">
                        <nav className="flex flex-col gap-y-2 pt-6">
                            {routes.map(route => (
                                <Button
                                    key={route.href}
                                    variant={route.href === pathname ? "secondary" : "ghost"}
                                    onClick={() => onClick(route.href)}
                                    className="w-full justify-start"
                                >{route.label}</Button>
                            ))}
                        </nav>
                    </SheetContent>
                </SheetTrigger>
            </Sheet>
        );
    }
    
    return (
        <div className="hidden lg:flex items-center gap-x-2 overflow-auto">{routes.map(route => (
           <NavButton
            key={route.href}
            href={route.href}
            label={route.label}
            isActive={pathname === route.href}
           />
        ))}</div>
    );
}