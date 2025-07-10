import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            {children}
            {/* Toast component */}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#1F2937", // Tailwind gray-800
                  color: "#fff",
                },
                success: {
                  iconTheme: {
                    primary: "#10B981", // Tailwind green-500
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#EF4444", // Tailwind red-500
                    secondary: "#fff",
                  },
                },
              }}
            />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}