import { useContext, useState, useEffect } from "react";
import styled from "styled-components"
import axios from "axios";
import { useNavigate } from "react-router";

import UserContext from "../../context/userContext"


export default function Wallet() {

    const { userInfo } = useContext(UserContext);
    const { token, name: username } = userInfo;
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState({});
    const { userTotal, userTransactions } = transactions;


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
        const promise = axios.get("http://localhost:5000/wallet", config);
        promise.then((response) => {
            const { data } = response
            setTransactions(data);
            console.log(response)
        });
        promise.catch(() => {
            console.log("houve um problema");
        })
    }, []);



    const newTotal = formatCash(userTotal?.toFixed(2));
    const isProperties = Object.keys(transactions).length > 0 ? true : false;

    //FIXME: CSS/HTML do saldo ta estranho
    const wallet =
        <DivWallet>
            <DivUser>
                <h1>Olá, {username}</h1>
                <ion-icon name="exit-outline"></ion-icon>
            </DivUser>
            <DivStatement>
                {isProperties
                    ? userTransactions.map((transaction) => {
                        const { date, description, type, value, _id } = transaction;

                        return (
                            <Transaction key={_id} >
                                <p className="date">{formatDate(date)}
                                    <span className="description">{description}</span>
                                </p>
                                <p className={type}>{formatCash(value.toFixed(2))}</p>
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
                <div onClick={() => navigate("/Entry")}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova <br /> entrada</p>
                </div>
                <div onClick={() => navigate("/Remove")}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova <br /> saída</p>
                </div>
            </DivPayment>
        </DivWallet >

    const loading = <></>
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
    justify-content: space-between;

    margin-bottom: 18px;
    
    .date{
        color: #C6C6C6;
    }

    .description{
        margin-left: 10px;
        color: #000;
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
