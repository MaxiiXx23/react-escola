import styled from 'styled-components';

export const Title = styled.h1`
    background-color: red;
    color : ${props => props.primayColor ? 'white' : 'black'};
    small {
        margin-left: 50px;
    }
`