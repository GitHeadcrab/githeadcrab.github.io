import React, { useContext } from "react"
import { TagsContext } from "../Api"

export default function Func({ tags, name, description, inputs, outputs, code, deprecateNotice, status, example}) {
    const [args, setArgs] = React.useState(inputs)
    const [rets, setRets] = React.useState(outputs)
    const { updateTags, selectedTags } = useContext(TagsContext)

    tags?.sort()
    
    const tagElements = tags?.map((tag, index) => {
        const selected = selectedTags.includes(tag)
        return (
            <span
                key={index}
                className={`func--prev ${selected ? "red" : ""}`}
                onClick={() => updateTags(tag)}
            >{tag}</span>
        )
    })

    const retsExamples = rets.map((ret, index) => (
        <span key={index} className="func--return courier">
            {ret.name}
            {index < rets.length - 1 && <inline className="func--text">, </inline>}
        </span>
    ))

    const argsExamples = args.map((arg, index) => (
        <span key={index} className="func--argument courier">
            {arg.optional ? `[${arg.name}]` : arg.name}
            {index < args.length - 1 && <inline className="func--text">, </inline>}
        </span>
    ))

    const argsList = args.map((arg, index) => (
        <p key={index} className="func--argument courier">{arg.name}
            <inline className="func--text"> (<inline className="courier">{arg.type}</inline>{arg.optional &&  ", optional"}) - {arg.description}</inline>
        </p>
    ))

    const retsList = rets.map((ret, index) => (
        <p key={index} className="func--return courier">{ret.name}
            <inline className="func--text"> (<inline className="courier">{ret.type}</inline>) - {ret.description}</inline>
        </p>
    ))
    
    const exampleReturns = (rets[0] 
        ? <>{retsExamples}<span className="func--text"> = </span></> 
        : ""
    )
    const exampleArguments = (args[0] 
        ? <span className="func--argument">{argsExamples}</span> 
        : ""
    )

    const headerElement = (
        <h2 className="func--header">
            {name}
            {status && <inline className="func--text func--status">{` (${status})`}</inline>}
        </h2>)

    const exampleElement = (
        <div className="func--example">
            {exampleReturns}
            <span className="func--text func--func courier">{`${name}(`}</span>
            {exampleArguments}
            <span className="func--text func--func courier">)</span>
        </div>)

    const descriptionElement = (
        <div className="func--description">
            {deprecateNotice && <p className="red bold">This function will be deprecated in the next update!</p>}
            {description && <p className="func--text">{description}</p>}
        </div>)

    const returnsElement = (
        <div className="func--returns">
            <p className="func--text">Return values</p>
            {
                rets[0]
                    ? <>{retsList}</>
                    : <p className="func--return">none</p>
            }
        </div>)

    const tagField = (
        tags && <div className="func--flex func--tags">
            {tagElements}
        </div>
    )

    const argumentsElement = (
        <div className="func--arguments">
            <p className="func--text">Arguments</p>
            {
                args[0]
                    ? <>{argsList}</>
                    : <p className="func--argument">none</p>
            }
        </div>)
    const exampleCode = example
        ? <div className="func--code func--text courier">
            {example}
        </div>
        : ""
    return (
        <div className="func">
            {headerElement}
            
            {exampleElement}

            {returnsElement}

            {argumentsElement}

            {descriptionElement}

            {exampleCode}
            
            {tagField}
        </div>
    )
}