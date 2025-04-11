import Nav from '@/components/Nav'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"

const AppLayout = () => {
  return (
    <div className='bg-white'>
     
     <main className='min-h-screen'>
      <Nav/>
      <Toaster /> 
      <Outlet />
     </main>
    </div>
  )
}

export default AppLayout
