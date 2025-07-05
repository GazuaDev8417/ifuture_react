import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    padding: 1rem;

    img{
        width: 120px;
        margin-bottom: 1rem;
    }
    
    .title{
        font-size: 2rem;
        margin-bottom: 2rem;
        font-weight: 500;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
        max-width: 320px;
    }

    .sr-only{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .form-input{
        padding: .75rem 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        width: 100%;
        margin: 5px;
        box-shadow: 1px 1px 4px;
    }

    .form-input:focus {
        border: 1px solid #b11717;
        box-shadow: 0 0 4px #000;
        outline: none;
    }

    .input-icon-container{
        position: relative;
    }

    .eye-icon{
        position: absolute;
        top: 50%;
        right: .7rem;
        transform: translateY(100%);
        font-size: 1.2rem;
        cursor: pointer;
        color: #666;
    }

    .btn-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 320px;
        margin-left: 12px;
    }
 
    .login-button{
        padding: .75rem;
        color: white;
        font-size: 1rem;
        font-weight: 500;
        box-shadow: 1px 1px 4px black;
    }

    .login-button:hover{
        box-shadow: 0 0 6px #a11414;
        background-color: #990f0f;
    }

    .login-button:focus {
        outline: 3px solid #a11414;
        box-shadow: 0 0 6px #000;
    }

    p{
        margin-top: 2rem;
        font-size: .9rem;
    }

    a{
        color: #1976d2;
        text-decoration: none;
        font-weight: 500;
    }

    a:hover{
        text-decoration: underline;
    }

/* MEDIA QUERY */
    @media(max-width: 320px){
        .btn-container{
            width: 100%;
        }
    }

/* HEIGTH */
    @media(max-height: 2500px){
        .eye-icon{
            top: 30.5%;
        }
    }

    @media(max-height: 2300px){
        .eye-icon{
            top: 31%;
        }
    }

    @media(max-height: 2170px){
        .eye-icon{
            top: 31.5%;
        }
    }

    @media(max-height: 1900px){
        .eye-icon{
            top: 32.5%;
        }
    }

    @media(max-height: 1631px){
        .eye-icon{
            top: 34%;
        }
    }

    @media(max-height: 1346px){
        .eye-icon{
            top: 35.5%;
        }
    }

    @media(max-height: 1160px){
        .eye-icon{
            top: 37%;
        }
    }

    @media(max-height: 992px){
        .eye-icon{
            top: 39%;
        }
    }

    @media(max-height: 910px){
        .eye-icon{
            top: 42.5%;
        }
    }

    @media(max-height: 780px){
        .eye-icon{
            top: 42.5%;
        }
    }
/* ------------------------------ */
    @media(max-height: 700px){
        .eye-icon{
            top: 45.5%;
        }
    }

    @media(max-height: 605px){
        .eye-icon{
            top: 48%;
        }
    }

    @media(max-height: 560px){
        .eye-icon{
            top: 50%;
        }
    }

    @media(max-height: 500px){
        .eye-icon{
            top: 53%;
        }
    }

    @media(max-height: 440px){
        .eye-icon{
            top: 56.5%;
        }
    }

    @media(max-height: 409px){
        .eye-icon{
            top: 59%;
        }
    }

    @media(max-height: 376px){
        .eye-icon{
            top: 62%;
        }
    }

    @media(max-height: 348px){
        .eye-icon{
            top: 65%;
        }
    }
`