import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../componentes/Header'
import Footer from '../componentes/Footer'

function RootLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout 