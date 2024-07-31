import { createContext, useContext, useState } from "react"

const appContext = createContext()

export const useAppContext = () => useContext(appContext)

const AppContextProvider = ({ children }) => {
  const [files, setFiles] = useState([]) // Global State for Change formate Files
  const [resizeFiles, setResizeFiles] = useState([]) // Global State for resize Files

  return (
    <appContext.Provider
      value={{
        files,
        setFiles,
        resizeFiles,
        setResizeFiles,
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export default AppContextProvider
