import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from 'react'
import { ThreeDots } from "react-loader-spinner";

import UserContext from "./../../context/userContext.js"


export default function SignIn() {

    const { setUserInfo } = useContext(UserContext)

    const [click, setClick] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function saveLocalStorage(data) {
        const stringifiedData = JSON.stringify(data);
        localStorage.setItem("userData", stringifiedData);
    }

    async function sendLogin(e) {
        e.preventDefault();
        setClick(true);
        const data = {
            email,
            password
        }

        try {
            const response = await axios.post(`https://projeto13-my-wallet-back.herokuapp.com/signIn`, data)
            setUserInfo(response.data); // use context
            saveLocalStorage(response.data);
            navigate('/wallet')
        } catch (e) {
            console.log(e)
        }
    }

    const loader = click ? <ThreeDots width="50" height="50" color="white" /> : "Entrar"

    return (
        <Login>
            <h1>MyWallet</h1>
            <form onSubmit={sendLogin}>
                <Input type="email" required value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" min={4} required value={password} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                <EnterButton>{loader}</EnterButton>
            </form>
            <Link to="/SignUp" >
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </Login>
    )
}

const Login = styled.div`

    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    background-color: var(--main-color);

    h1{
        font-family: var(--secondary-font);
        font-weight: 400;
        color: white;
        font-size: 32px;

        margin-bottom: 24px;
    }

    a{
        text-decoration: none;
    }
    
    p{
        font-family: var(--main-font);
        font-weight: 700;
        color: white;
        font-size: 15px;
    }
    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`

const Input = styled.input`
    width: 326px;
    height: 58px;

    border: none;
    outline: none;
    border-radius: 5px;
    background-color: white;

    font-family: var(--main-font);
    font-size: 20px;

    padding-left: 15px;
    margin-bottom: 13px;

    ::placeholder{
        color: #000000;
    }
`

const EnterButton = styled.button`
    width: 326px;
    height: 46px;

    display: flex;
    justify-content: center;
    align-items: center;

    outline: none;
    border: none;
    border-radius: 5px;

    color: white;
    font-size: 20px;
    font-weight: 700;

    background-color: var(--secondary-color);
    margin-bottom: 32px;
`

