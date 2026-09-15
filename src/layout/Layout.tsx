import { useState } from "react"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  
    const [openSidebar, setOpenSidebar] = useState<boolean>(true)

   const toggleSidebar = () => {
    setOpenSidebar(!openSidebar)
   }
    return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        isOpen={openSidebar}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1440px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
