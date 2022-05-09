import axios from "axios";
import { useState, useContext } from "react"
import { useNavigate } from "react-router";
import styled from "styled-components"
import CurrencyInput from "react-currency-input-field";
import { ThreeDots } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import UserContext from "../../context/userContext";

export default function Transaction() {

    const { search } = useLocation();
    const { method, text, id } = queryString.parse(search);

    const { userInfo } = useContext(UserContext);
    const { token } = getUserData()

    function getUserData() {
        if (Object.keys(userInfo).length > 0) return userInfo;
        else return callLocalStorage();
    }


    function callLocalStorage() {
        const dataString = localStorage.getItem("userData");
        return JSON.parse(dataString);
    }

    const navigate = useNavigate();

    const [click, setClick] = useState(false);
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")

    function formatCash(cash) {
        const newCash = `${cash}`.replace(",", ".");
        return newCash;
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    function sendEntry(e) {
        e.preventDefault();
        setClick(true);

        const data = {
            value: formatCash(value),
            description,
        }

        if (method === "update") updateWallet(data)
        else postWallet(data);

    }

    function postWallet(data) {
        axios.post(`http://localhost:5000/wallet/${method}`, data, config)
            .then((response) => {
                console.log(response.data);
                navigate("/wallet");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function updateWallet(data) {
        axios.put(`http://localhost:5000/wallet/${id}`, data, config)
            .then((response) => {
                console.log(response.data);
                navigate("/wallet");
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const operation = method === "upadate" ? "Editar" : "Nova"
    const buttonOperation = method === "upadate" ? "Editar" : "Salvar"
    const loader = click ? <ThreeDots width="50" height="50" color="white" /> : `${buttonOperation} ${text}`

    return (
        <NewEntry>
            <h1>{operation} {text}</h1>
            <form onSubmit={sendEntry}>
                <CurrencyInput decimalSeparator="," min={1} value={value} decimalsLimit="2" placeholder="Valor" required onValueChange={(value) => setValue(value)} />
                <input type="text" required value={description} placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} />
                <SaveButton type="submit">{loader}</SaveButton>
            </form>
        </NewEntry>
    )
}


const NewEntry = styled.div`

    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    background-color: var(--main-color);

    padding: 25px 25px 0 25px;

    h1{
        font-family: var(--main-font);
        font-weight: 700;
        color: white;
        font-size: 26px;

        margin-bottom: 24px;
    }
    
    p{
        font-family: var(--main-font);
        font-weight: 700;
        color: white;
        font-size: 15px;
    }

    input{
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
    }

`

const SaveButton = styled.button`
    width: 326px;
    height: 46px;

    outline: none;
    border: none;
    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    font-size: 20px;
    font-weight: 700;

    background-color: var(--secondary-color);
    margin-bottom: 32px;
`
