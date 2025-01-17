import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/models/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/models/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/models/RentModal";
import SearchModal from "./components/models/SearchModal";



export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito ({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <SearchModal />
          <LoginModal />
          <RegisterModal />
        <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
