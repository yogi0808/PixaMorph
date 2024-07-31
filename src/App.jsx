import React from "react"

// Files
import { Outlet } from "react-router-dom"
import Header from "./components/Header"

const App = () => {
  return (
    <main className="flex flex-col min-h-screen bg-b-4">
      <Header />
      <Outlet />
    </main>
  )
}

export default App
