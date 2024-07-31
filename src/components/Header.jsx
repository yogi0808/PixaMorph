import React from "react"
import { NavLink, useLocation } from "react-router-dom"

const Header = () => {
  const location = useLocation()

  return (
    <div className="w-full py-6 px-3 md:px-24 gap-4 flex items-center justify-between sticky top-0 left-0 backdrop-blur-md">
      <NavLink
        to={"/"}
        className="font text-3xl md:text-4xl font-extrabold tracking-tighter text-b-3"
      >
        PixaMorph
      </NavLink>
      <div className="flex-center gap-4">
        <NavLink
          to={location.pathname === "/" ? "/resizer" : "/"}
          className={`px-4 py-1 rounded-xl font-semibold md:text-lg transition-all duration-300 ease-out text-w hover:bg-b-1`}
        >
          {location.pathname === "/" ? "Resize Image" : "Change Format"}
        </NavLink>
      </div>
    </div>
  )
}

export default Header
