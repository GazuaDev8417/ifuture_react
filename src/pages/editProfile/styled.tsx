import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    padding: 1rem;

    .icon{
        position: absolute;
        top: 5%;
        left: 2%;
        font-size: 2rem;
        cursor: pointer;
    }

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
        gap: .5rem;
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

    .btn-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 320px;
    }

    .btn{
        padding: .75rem;
        color: white;
        font-size: 1rem;
        font-weight: 500;
        box-shadow: 1px 1px 4px black;
    }

    .btn:hover{
        box-shadow: 0 0 6px #a11414;
        background-color: #990f0f;
    }

    .btn:focus {
        outline: 3px solid #a11414;
        box-shadow: 0 0 6px #000;
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
        .title{
            font-size: 1.3rem;
        }

        .form-input{
            width: 65vw;
        }

        .btn-container{
            width: 65vw;
        }
    }
`