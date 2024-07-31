import React from "react"
import ReactDOM from "react-dom/client"

// Files
import "./index.css"
import App from "./App.jsx"
import AppContextProvider from "./store/appContext.jsx"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Resizer from "./pages/Resizer.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
    >
      <Route
        index={true}
        path=""
        element={<Home />}
      />
      <Route
        path="/resizer"
        element={<Resizer />}
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
)
