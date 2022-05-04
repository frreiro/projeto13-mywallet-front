import styled from "styled-components"

const nums = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]

export default function Wallet() {
    return (
        <DivWallet>
            <DivUser>
                <h1>Olá, Fulano</h1>
                <ion-icon name="exit-outline"></ion-icon>
            </DivUser>
            <DivStatement>
                {nums.map((num) => {
                    return (
                        <Transaction>
                            <p className="date">30/11
                                <span className="description">Almoço mãe</span>
                            </p>
                            <p className="out">60,30</p>
                        </Transaction>
                    )
                })
                }

            </DivStatement>
            <DivTotal>
                <p className="total">SALDO</p>
                <p className="in">4000,00</p>
            </DivTotal>
            <DivPayment>
                <div>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova <br /> entrada</p>
                </div>
                <div>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova <br /> saída</p>
                </div>
            </DivPayment>
        </DivWallet >
    )
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
