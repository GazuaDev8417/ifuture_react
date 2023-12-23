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
        position: relative
    }

    .form-input{
        width: 30vw;
    }

    .eye-icon{
        position: absolute;
        right: 3%;
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

/* MEDIA QUERY */
    @media(max-width: 930px){
        .form-input{
            width: 40vw;
        }

        button{
            width: 40vw;
        }
    }

    @media(max-width: 690px){
        .form-input{
            width: 50vw;
        }

        button{
            width: 50vw;
        }
    }

    @media(max-width: 510px){
        .form-input{
            width: 65vw;
        }

        button{
            width: 65vw;
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