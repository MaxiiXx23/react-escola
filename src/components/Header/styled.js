import styled from "styled-components";
import { Color } from '../../config/colors';

export const Nav = styled.nav`
    background: ${Color.primaryColor};
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center; 
    a{
        color: #fff;
        margin: 0 15px 0 0 ;
        font-weight: bold;
    }
`;
export const Name = styled.span`
    color: #fff;
    margin: 0 15px 0 0 ;
    font-weight: bold;
    font-size: 15px;
`;