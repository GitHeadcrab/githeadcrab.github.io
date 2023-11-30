import React from "react"
import { 
    RouterProvider, 
    createBrowserRouter,
    createRoutesFromElements,
    Route, 
    redirect
} from "react-router-dom"
import Home, { loader as openaiLoader } from "./pages/Home"
import About from "./pages/About"
import Api from "./pages/Api"

import Layout from "./components/Layout"
import ApiLayout from "./components/ApiLayout"
import Error from "./components/Error"
import NotFound from "./pages/NotFound"

import { requireAuth } from "./utils"

import "./server"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="api" element={<ApiLayout/>} >
                <Route index element={<Api />} />
            </Route>

            <Route 
                path="*" 
                element={<NotFound />} 
            />
        </Route>
    )
)

export default function App() {
    return (
        <RouterProvider router={router} />
    )
}