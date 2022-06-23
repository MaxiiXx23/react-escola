import styled from 'styled-components';

export const Title = styled.h1`
    background-color: red;
    color : ${props => props.primayColor ? 'white' : 'black'};
    small {
        margin-left: 50px;
    }
`

export const FormPhoto = styled.form`
    label{
        width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #636e72;
        border: 4px dashed #d63031;
        margin: 30px auto;
        cursor: pointer;
        border-radius: 50%;
        color: #fff;
        overflow: hidden;
    }
    input{
        display: none;
    }
    img{
        width: 120px;
        height: 120px;

    }
`;

export const ContainerBtnConfirm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;
    
`;