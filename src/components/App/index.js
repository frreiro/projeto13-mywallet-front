import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Wallet from "../Wallet";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Wallet" element={<Wallet />} />
            </Routes>
        </BrowserRouter>
    )
}
