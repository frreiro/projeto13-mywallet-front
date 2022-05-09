import { Route, Routes, BrowserRouter } from "react-router-dom";
import Transaction from "../Transaction";
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
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/transaction" element={<Transaction />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}
