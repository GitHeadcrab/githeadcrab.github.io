import React from "react"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <div className="api--wrapper">
            <div>
                <Outlet />
            </div>
        </div>
    )
}