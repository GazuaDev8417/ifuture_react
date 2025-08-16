import { ReactNode } from 'react'
import styled from 'styled-components'


const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
`

interface HeaderProps{
    leftIcon:ReactNode
    center:ReactNode
    rightIcon:ReactNode
}


const Header = (props:HeaderProps)=>{
    



    return(
        <Container>
            {props.leftIcon}
            {props.center}
            {props.rightIcon}
        </Container>
    )
}

export default Header