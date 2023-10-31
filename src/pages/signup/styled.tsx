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

    form span{
        position: relative;
        border: 1px solid;
        width: 5px;
        height: 5px;
    }
    
    .eye-icon{
        position: absolute;
        right: 36%;
        bottom: 39%;
        font-size: 1.2rem;
        cursor: pointer;
    }

    .eye-icon2{
        position: absolute;
        right: 36%;
        bottom: 32.5%;
        font-size: 1.2rem;
        cursor: pointer;
    }

    button{
        width: 30vw;
        height: 40px;   
        font-size: 1rem;
        color: #fff;
    }

    .btn-container{
        display: flex;
        width: 30vw;
        flex-direction: column;
        gap: 5px;
    }

    .submit-btn{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
    }
`