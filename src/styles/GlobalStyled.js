import styled, { createGlobalStyle } from 'styled-components';
import { Color } from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';
export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }
    body{
        font-family: sans-serif;
        background: ${Color.primaryDarkColor};
    }
    html, body, #root {
        height: 100%;
    }

    button {
        cursor: pointer;
        background: ${Color.primaryColor};
        border: none;
        color: #fff;
        padding: 10px 20px;
        font-weight: 700;
        transition: all 300ms;
    }
    button:hover {
        filter: brightness(85%);
    }
    a{
        text-decoration: none;
        color: ${Color.primaryColor};
    }
    ul{
        list-style: none;
    }

    body .Toastify__toast-theme--colored.Toastify__toast--success {
        background: ${Color.successColor};
}
`;

export const Container = styled.section`
    max-width: 500px;
    background: #fff;
    margin: 30px auto;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    label{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
    input{
        height: 40px;
        font-size: 18px;
        border: 1px solid #ddd;
        padding: 0 10px;
        margin-top: 5px;
        &:focus {
            border: 1px solid ${Color.primaryColor};
        }
    }
`;

export const Title = styled.h1`
    text-align: center;
`;