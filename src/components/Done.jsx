import React from "react"

// Files
import CheckSvg from "../svg/CheckSvg"

const Done = () => {
  return (
    <p className="px-2 text-sm text-black rounded-full bg-g flex-center gap-1 font-semibold">
      Done <CheckSvg />
    </p>
  )
}

export default Done
