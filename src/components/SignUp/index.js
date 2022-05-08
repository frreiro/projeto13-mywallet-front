import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";


export default function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    let navigate = useNavigate();

    function formatData(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            password
        }
        password === confirmPass
            ? sendRegister(data)
            : console.log("SENHAS DIFERENTES");

    }

    function sendRegister(data) {
        axios.post("http://localhost:5000/signUp", data)
            .then((response) => {
                console.log(response);
                navigate("/");
            })
            .catch((e) => {
                alert("Erro de validação")
                console.log(e);
            })
    }


    return (
        <Register>
            <h1>MyWallet</h1>
            <form onSubmit={formatData}>
                <Input type="text" required placeholder="Nome" onChange={(e) => setName(e.target.value)} />
                <Input type="email" required placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" required min={4} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                <Input type="password" required min={4} placeholder="Confirme a senha" onChange={(e) => setConfirmPass(e.target.value)} />
                <RegisterButton type="submit">Cadastrar</RegisterButton>
            </form>
            <Link to="/" >
                <p>Ja tem conta? Entre agora!</p>
            </Link>
        </Register>
    )
}




const Register = styled.div`

    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: var(--main-color);

    h1{
        font-family: 'Saira Stencil One';
        font-weight: 400;
        color: white;
        font-size: 32px;

        margin-bottom: 28px;
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

const RegisterButton = styled.button`
    width: 326px;
    height: 46px;

    outline: none;
    border: none;
    border-radius: 5px;

    color: white;
    font-size: 20px;
    font-weight: 700;

    background-color: var(--secondary-color);
    margin-bottom: 32px;
`

