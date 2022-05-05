import styled from "styled-components"

export default function Remove() {
    return (
        <NewRemove>
            <h1>Nova saída</h1>
            <Input placeholder="Valor" />
            <Input placeholder="Descrição" />
            <SaveButton>Salvar saída</SaveButton>
        </NewRemove>
    )
}


const NewRemove = styled.div`

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

const SaveButton = styled.button`
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