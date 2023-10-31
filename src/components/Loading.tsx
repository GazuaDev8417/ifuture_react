import styled, { keyframes } from "styled-components"


const loadCircle = keyframes`
    to{
        transform: rotate(1turn);
    }
`

export const Loading = styled.div`
    border: 3px solid #dc2b2b;
    border-top: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${loadCircle} 1s infinite;
`