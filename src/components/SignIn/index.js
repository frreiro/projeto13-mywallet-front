import styled from "styled-components"
import "../../css/styled.css"
import '../../css/reset.css'


export default function SignIn() {
    return (
        <Login>
            <h1>MyWallet</h1>
            <Input placeholder="E-mail" />
            <Input placeholder="Senha" />
            <EnterButton>Entrar</EnterButton>
            <p>Ja tem consta? Entre agora!</p>

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
        font-family: 'Saira Stencil One';
        font-weight: 400;
        color: white;
        font-size: 32px;

        margin-bottom: 24px;
    }
    
    p{
        font-family: var(--main-font);
        font-weight: 700;
        color: white;
        font-size: 15px;
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

    outline: none;
    border: none;
    border-radius: 5px;

    color: white;
    font-size: 20px;
    font-weight: 700;

    background-color: var(--secondary-color);
    margin-bottom: 32px;
`

