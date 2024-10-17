import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import HeaderComp from "../_organisms/header/header";
import styles from "./layout.module.scss";
import { BoekettenlijstStoreProvider } from "../providers/boekettenlijst-store-provider";
import PopupProvider from '../providers/popupProvider'

export const metadata: Metadata = {
    title: "FlowerWorks",
    description: "Boeketten Bekijk Basis",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className={styles.bodywrapper}>                    
                    <PopupProvider>
                        <BoekettenlijstStoreProvider>
                            <HeaderComp />
                            {children}
                            </BoekettenlijstStoreProvider> 
                    </PopupProvider>
                </div>
            </body>
        </html>
    );
}
