import { ReactNode, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../imgs/logo-future-eats-invert.png'


const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 20px;

    img{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    img:hover{
        cursor: pointer;
    }
`

interface HeaderProps{
    leftIcon:ReactNode
    rightIcon:ReactNode
}


const Header = (props:HeaderProps)=>{
    const navigate = useNavigate()
    const imageRef = useRef<HTMLImageElement | null>(null)

    const hideImage = ()=>{
        if(imageRef.current && window.scrollY > 0){
            imageRef.current.style.display = 'none'
        }else if(imageRef.current && window.scrollY < 100){
            imageRef.current.style.display = 'block'
        }
    }
    
    window.addEventListener('scroll', hideImage)
    



    return(
        <Container>
            {props.leftIcon}
            <img src={Logo} alt="Logo" ref={imageRef} onClick={() => navigate('/ifuture_react')} />
            {props.rightIcon}
        </Container>
    )
}

export default Header