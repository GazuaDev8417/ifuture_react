import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 10vh 0 0;
    
    .title{
        font-size: 1.5rem;
        margin: 10vh 0 5vh;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }

    .form-input{
        width: 30vw;
    }

    .eye-icon{
        position: absolute;
        right: 36%;
        top: 45.5%;
        font-size: 1.2rem;
        cursor: pointer;
    }

    button{
        width: 30vw;
        height: 40px;   
        font-size: 1rem;
        color: #fff;
    }

    p{
        margin-top: 5vh;
    }
`