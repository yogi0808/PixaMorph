import React from "react"
import ReactDOM from "react-dom/client"

// Files
import "./index.css"
import App from "./App.jsx"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Resizer from "./pages/Resizer.jsx"
import { Provider } from "react-redux"
import store from "./store/store.js"

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
