import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {firstname: 'VLADY', lastname: 'olshevskyi'}
  return (
    <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedIn}/>
        <div className="flex size-full flex-col">
          <div className="root-layout">
              <Image
              src='/icons/aurum-logo.svg'
              width={100}
              height={30}
              alt="menu icon"
              className="ml-[-10]"
              />
              <div>
                <MobileNav user={loggedIn}/>
              </div>
          </div>
          {children}
        </div>

    </main>
  );
}
