import styled from 'styled-components';

export const Title = styled.h1`
    background-color: red;
    color : ${props => props.primayColor ? 'white' : 'black'};
    small {
        margin-left: 50px;
    }
`
 export const ProfilePhoto = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0 20px;
    position: relative;
    img{
        width: 120px;
        height: 120px;
        border: 2px solid #d63031;
        border-radius: 50%;
    }
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0;
        border: none;
        position: absolute;
        background: #d63031;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
    }

 `; 