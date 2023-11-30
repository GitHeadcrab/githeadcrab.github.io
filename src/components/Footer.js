import { Link } from "react-router-dom"
import reactLogo from "../assets/images/logo192.png"
import nodeLogo from "../assets/images/node.png"
import teardownLogo from "../assets/images/td.png"

export default function Footer() {
    return (
        <div>
            <footer>
                Made with
                <inline>
                    <Link to="https://react.dev/" target="_blank" rel="noopener noreferrer">
                        <img style={{height: "50px", paddingLeft: "10px"}} src={reactLogo} alt="React" />
                    </Link>
                    <Link to="https://nodejs.org/" target="_blank" rel="noopener noreferrer">
                        <img style={{height: "50px", paddingLeft: "10px", paddingRight: "10px"}} src={nodeLogo} alt="NodeJS" />
                    </Link>
                </inline>
                for
                <inline>
                    <Link to="https://teardowngame.com/" target="_blank" rel="noopener noreferrer">
                        <img style={{height: "50px", paddingLeft: "10px"}} src={teardownLogo} alt="Teardown" />
                    </Link>
                </inline>
            </footer>
        </div>
    )
}