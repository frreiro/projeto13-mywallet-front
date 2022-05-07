import { Route, Routes, BrowserRouter } from "react-router-dom";
import Entry from "../Entry";
import Remove from "../Remove";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Wallet from "../Wallet";
import { useState } from "react";

import UserContext from "../../context/userContext";
import "../../css/styled.css"
import '../../css/reset.css'

export default function App() {

    const [userInfo, setUserInfo] = useState({})

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ userInfo, setUserInfo }}>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/Wallet" element={<Wallet />} />
                    <Route path="/Entry" element={<Entry />} />
                    <Route path="/Remove" element={<Remove />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}
