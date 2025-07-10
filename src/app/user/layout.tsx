"use client";

import UserAppHeader from "@/layout/user/AppHeader";
import React from "react";
import { metadata } from "../(admin)/page";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <UserAppHeader />
      <main className="flex-1 mx-auto w-full">
        {children}
      </main>
    </div>
  );
}