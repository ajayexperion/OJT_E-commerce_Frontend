import Nav from "./Nav";
import UserRouter from "./UserRouter";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const Template= () => {
    return (
        <div>
          <Router>
            <Nav></Nav>
            <UserRouter></UserRouter>
            </Router>
        </div>
    )
}

export default Template;