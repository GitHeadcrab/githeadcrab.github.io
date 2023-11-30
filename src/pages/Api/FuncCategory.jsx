import React from "react"
import Func from "./Func"

export default function FuncCatgeory({ name, description, functions}) {
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)
    const [maximized, setMaximized] = React.useState(false)
    const categoryClass = maximized ? "func--grid" : "func--flex"

    const categoryStyle = {
        gridTemplateColumns: "1fr ".repeat(functions.length <= 3 ? functions.length : (Math.ceil(screenWidth / (1920 / 3))))
    }

    const funcPrevs = functions.map(func => (
        <span className="func--prev">{func.name}</span>
    ))
    
    const funcs = functions.map(func => (
        <Func {...func} />
    ))

    const categoryFlex = (
        <div className="func--flex">
            {funcPrevs}
        </div>
    )

    const categoryGrid = (
        <div className="func--grid" style={categoryStyle}>
            {funcs}
        </div>
    )

    function toggleMaximized() {
        console.log(maximized)
        setMaximized(prevState => !prevState)
    }

    if (functions && functions.length > 0) {
        return(
            <div>
                <button
                    className="func--category-button"
                    onClick={() => toggleMaximized()}
                >
                    <h2 className="func--category-header">
                        {name}
                    </h2>
                </button>
                <p className="func--text func--category-description">{description}</p>
                {categoryFlex}
                {maximized ? categoryGrid : ""}
                <hr />
            </div>
        )
    }

    return false
}