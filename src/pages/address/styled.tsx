import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 10vh 0 0;
    
    .icon{
        position: absolute;
        top: 5%;
        left: 2%;
        font-size: 2rem;
        cursor: pointer;
    }

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

    button{
        width: 30vw;
        height: 40px;   
        font-size: 1rem;
        color: #fff;
    }

    .btn-container{
        display: flex;
        align-items: center;
        width: 30vw;
        gap: 5px;
    }

/* MEDIA QUERY */
    @media(max-width: 930px){
            .form-input{
                width: 40vw;
            }

            .btn-container{
                width: 40vw;
            }
        }

    @media(max-width: 690px){
        .form-input{
            width: 50vw;
        }

        .btn-container{
            width: 50vw;
        }
    }

    @media(max-width: 510px){
        .form-input{
            width: 65vw;
        }

        .btn-container{
            width: 65vw;
        }
    }
`