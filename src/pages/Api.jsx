import React, { createContext } from "react"
import FuncCategory from "./Api/FuncCategory"
import { checker } from "../utils"

import categories from "../functions.json"
const TagsContext = React.createContext()

export { TagsContext };

export default function Documentation() {
    const [selectedTags, setSelectedTags] = React.useState([])
    const [filters, setFilters] = React.useState({
        And: false,
        Or: false
    })
    //const filters = ["and", "or"]
    let tags = []

    let categoryElements = categories.map(({ category, description, functions }) => {
        functions.map(func => {
            tags = tags.concat(func.tags).filter((value, index, self) => {
                return value !== undefined ? self.indexOf(value) === index : null
            })
        })

        if (selectedTags.length > 0) {
            functions = functions.filter(func => {
                if (func.tags && func.tags.length > 0) {
                    //return selectedTags.some(tag => func.tags.includes(tag));
                    return checker(func.tags, selectedTags)
                }
                return false;
            });
        }

        if (functions.length > 0) {
            return (
                <FuncCategory
                    name={category}
                    description={description}
                    functions={functions}
                    updateTags={updateTags}
                />
            )
        }
        return false
    })

    tags.sort()

    function updateTags(tag) {
        setSelectedTags(prevSelectedTags => {
            const index = prevSelectedTags.indexOf(tag)
            if (index > -1) {
                const length = prevSelectedTags.length
                console.log(`Removed tag ${tag} length ${length}`)
                return prevSelectedTags.filter(selected => selected !== tag);
            } else {
                console.log(`Added tag ${tag}`)
                return [...prevSelectedTags, tag]
            }
        })
    }

    function updateFilter(filter) {
        setFilters({
                And: false,
                Or: false,
                [filter]: true
        })

        console.log(filters)
    }

    console.log(filters)

    const filterElements = Object.entries(filters).map(([key, value]) => {
        const selected = value
        return (<span className={`func--prev ${selected ? "red" : ""}`} onClick={() => updateFilter(key)}>{key}</span>)
    })

    const tagElements = tags.map(tag => {
        const index = selectedTags.indexOf(tag)
        const selected = index > -1
        return (<span className={`func--prev ${selected ? "red" : ""}`} onClick={() => updateTags(tag)}>{tag}</span>)
    })

    categoryElements = categoryElements.filter(element => element != false)

    //console.log(tags)
    //console.log(selectedTags)
    console.log(categoryElements)

    return (
        <TagsContext.Provider value={{updateTags, selectedTags}}>
            <div className="func--background">
                <h3 style={{color: "white", padding: "none", margin: "none"}}>Tag filtering:</h3>
                <div className="func--flex func--tags">
                    {filterElements}
                </div>
                <h3 style={{color: "white"}}>Available tags:</h3>
                <div className="func--flex func--tags">
                    {tagElements}
                </div>
                <div>
                    {categoryElements.length > 0
                        ? categoryElements
                        : <h1 style={{color: "white"}}>No matches, try "or" mabe? :\</h1>}
                </div>
            </div>
        </TagsContext.Provider>
    )
}