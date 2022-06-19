import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StudentContainer = styled.div`
    div{
        display: flex; 
        align-items: center;
        justify-content: space-between;
        padding: 5px 0;
    }
`;
export const ProfilePicture = styled.div`
    img{
        height: 36px;
        width: 36px;
        border-radius: 50%;
    }
`;

export const BoxConfirmDelete = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30px;
    background: rgb(0,0,0,0.8);
    div{
        background: #fff;
        color: black;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
`;
export const Modal = styled.div`
        z-index: 2;
        width: 70%;
        height: 50%;
        display: flex;
        flex-direction: row !important;
        justify-content: space-around;
        align-items: center;
`;
export const ButtonConfirm = styled.button`
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.delete ? '#d63031' : '#b2bec3'};
    background-color: ${props => props.delete ? '#d63031' : '#b2bec3'};
    padding: 5px;
    color: ${props => props.delete ? '#fff' : 'black'};
`;

export  const BtnCreateStudent = styled(Link)`
    text-decoration: none;
    color: #fff;
    border: 1px solid #00b894;
    padding: 2px 0 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    background: #00b894;
`;
export const HeaderOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;