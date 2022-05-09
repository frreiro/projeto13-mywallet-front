import { useContext, useState, useEffect } from "react";
import styled from "styled-components"
import axios from "axios";
import { useNavigate } from "react-router";
import { TailSpin } from "react-loader-spinner";

import UserContext from "../../context/userContext"


export default function Wallet() {

    const { userInfo } = useContext(UserContext);
    const { token, name: username } = getUserData();
    const navigate = useNavigate();



    function getUserData() {
        if (Object.keys(userInfo).length > 0) return userInfo;
        else return callLocalStorage();
    }

    function callLocalStorage() {
        const dataString = localStorage.getItem("userData");
        return JSON.parse(dataString);
    }


    function logOut() {
        if (callLocalStorage()) localStorage.removeItem("userData");
        navigate("/");
    }
    const [refresh, setRefresh] = useState(false)
    const [transactions, setTransactions] = useState({});
    const { userTotal, userTransactions } = transactions;

    function openTransactionPage(method, text, id) {
        if (method === "update") navigate(`/transaction?method=${method}&text=${text}&id=${id}`);
        if (method === "delete") navigate(`/transaction?method=${method}&id=${id}`);
        else navigate(`/transaction?method=${method}&text=${text}`);

    }

    function formatCash(cash) {
        const newFormat = `${cash}`.replace(".", ",");
        return newFormat;
    }

    function formatDate(date) {
        const newDate = date.slice(0, 5);
        return newDate;
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        const promise = axios.get(`https://projeto13-my-wallet-back.herokuapp.com/wallet`, config);
        promise.then((response) => {
            const { data } = response
            setTransactions(data);
        });
        promise.catch(() => {
            console.log("houve um problema");
        })
    }, [refresh]);

    function deleteWallet(id) {
        if (window.confirm("Vocễ deseja excluir esta transação da sua carteira?")) {
            const promise = axios.delete(`https://projeto13-my-wallet-back.herokuapp.com/wallet/${id}`, config);
            promise.then((response) => {
                console.log(response.data);
            });
            promise.catch(() => {
                console.log("houve um problema");
            })
            setRefresh(!refresh);
        }
    }



    const newTotal = formatCash(userTotal);
    const isProperties = Object.keys(transactions).length > 0 ? true : false;

    //FIXME: CSS/HTML do saldo ta estranho
    const wallet =
        <DivWallet>
            <DivUser>
                <h1>Olá, {username}</h1>
                <ion-icon name="exit-outline" onClick={logOut}></ion-icon>
            </DivUser>
            <DivStatement>
                {isProperties
                    ? userTransactions.map((transaction) => {
                        const { date, description, type, value, _id } = transaction;

                        return (
                            <Transaction key={_id} >
                                <p className="date">{formatDate(date)}
                                    <span className="description" onClick={() => openTransactionPage("update", "entrada", _id)}>{description}</span>
                                </p>
                                <p className={type}>{formatCash(value)}
                                    <span><ion-icon name="close-outline" onClick={() => deleteWallet(_id)}></ion-icon></span>
                                </p>
                            </Transaction>
                        )
                    })
                    : <></>
                }
            </DivStatement>
            <DivTotal>
                <p className="total">SALDO</p>
                <p className={userTotal < 0 ? "out" : "in"}>{newTotal}</p>
            </DivTotal>
            <DivPayment>
                <div onClick={() => openTransactionPage("in", "entrada", false)}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova <br /> entrada</p>
                </div>
                <div onClick={() => openTransactionPage("out", "saída", false)}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova <br /> saída</p>
                </div>
            </DivPayment>
        </DivWallet >

    const loading = <Loading><TailSpin width="100" height="100" color="#8C11BE" /></Loading>
    return isProperties ? wallet : loading
}

const DivWallet = styled.div`
    width: 100vw;
    height: 100vh;
    
    
    font-family: var(--main-font);
    font-style: normal;

    background-color: var(--main-color);
    padding: 0 25px 0 25px;

    h1{
        color: white;
        font-size: 26px;
        font-family: var(--main-font);
        font-weight: 700;
    }

    .in{
        color: #03AC00;
    }
    
    .out{
        color: #C70000;
    }


`

const DivUser = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0 22px 0;

    ion-icon{
        font-size: 28px;
        color: white;
    }
`


const DivStatement = styled.div`
    height: 416px;
    padding: 23px 12px 0px 12px;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 16px;
    font-weight: 400;
    
    border-radius: 5px 5px 0 0;
    background-color: white;

    overflow-y: scroll;
`

const DivTotal = styled.div`
    width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    

    padding: 10px 12px;
    border-radius: 0 0 5px 5px;


    p{
        font-size: 17px;
    }

    p.total{
        font-weight: 700;
        color: #000000;
    }


`

const Transaction = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 18px;
    
    .date{
        color: #C6C6C6;
    }

    .description{
        margin-left: 10px;
        color: #000;
    }

    p{
        display: flex;
        justify-content: center;
        align-items:center;
    }

    ion-icon{
        margin-left: 10px;
        color: #C6C6C6;
    }

    
`

const DivPayment = styled.div`
    display: flex;
    justify-content: space-between;
   

    ion-icon{
        font-size: 25px;
        color: white;
    }

    
    p{  
        color: white;
        font-size: 17px;
        font-weight: 700;
        font-family: var(--main-font);
        line-height: 20px;
        
    }

    div{
        width: 155px;
        height: 114px;
        background-color: var(--secondary-color);
        border-radius: 5px;

        display: flex;
        justify-content: space-between;
        flex-direction: column;

        margin-top: 13px;
        padding: 10px 0 10px 10px;
    }
`
const Loading = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`