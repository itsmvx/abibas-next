import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from "react";
import Script from "next/script";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
    title: 'Abibas | Home',
    description: 'Website jual-beli sepatu dan aksesoris lainnya, namun kami tidak menjual apa-apa',
}
type RootLayoutProps = {
    children: ReactNode
}
const poppins = Poppins({
    subsets: ['latin'],
    weight: '500',
    display: 'swap',
    preload: true
});

export default function RootLayout({ children }: RootLayoutProps ) {
    return (
        <html lang="en">
        <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></Script>
        <body className={poppins.className}>
            { children }
        </body>
        </html>
    )
}
