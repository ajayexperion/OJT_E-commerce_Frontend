
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ContactUs from "./ContactUs";
import Home from "./Home";


const UserRouter = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/contactus' element={<ContactUs />} />
                </Routes>
            </Router>
            {/* I am UserRouter */}
        </div>
    )
}

export default UserRouter;