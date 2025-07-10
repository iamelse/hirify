"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const TABS = [
  { name: "Home", path: "/user/home" },
  { name: "Jobs", path: "/user/jobs" },
  { name: "Notes", path: "/user/notes" },
  { name: "Calendar", path: "/user/calendar" },
];

const UserAppHeader: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Kiri: Logo dan Navigasi */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/user/home" className="flex items-center gap-2">
            <Image
              width={32}
              height={32}
              src="/images/logo/logo-icon.svg"
              alt="Logo Icon"
            />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Hirify
            </span>
          </Link>

          {/* Tabs */}
          <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
            <ul className="flex space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {TABS.map((tab) => {
                const isActive = pathname === tab.path;
                return (
                  <li key={tab.path}>
                    <Link
                      href={tab.path}
                      className={`inline-block px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                          : "hover:text-gray-700 dark:hover:text-gray-200"
                      }`}
                    >
                      {tab.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Kanan: Search + Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <NotificationDropdown />
          <ThemeToggleButton />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default UserAppHeader;