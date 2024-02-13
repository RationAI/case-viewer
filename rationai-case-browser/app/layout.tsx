import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import './globals.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import SessionProvider from "./components/SessionProvider/SessionProvider";
import CaseTree from './components/CaseTree'
import { getUserCaseHierarchy } from './utils'
import { authOptions } from './api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Case Browser',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  let hierarchy = null;
  if(session) {
    hierarchy = await getUserCaseHierarchy(session)
  }

  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          <div className="flex overflow-clip pt-[3.5rem] h-screen">
            <Sidebar>
              {hierarchy ? 
                <CaseTree root={true} rootLink={"/authorized/cases/path"} hierarchy={hierarchy} /> :
                <div>Log in to see your cases</div>
              }
            </Sidebar>
            <div className="p-2 overflow-scroll w-full">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
