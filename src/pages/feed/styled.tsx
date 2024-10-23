import styled from 'styled-components'


export const Container = styled.div`
    margin-top: 15vh;
    .input-container{
        margin-top: 5vh;
        text-align: center;
    }

    input{
        width: 50vw;
        box-shadow: 2px 2px 4px;
        border-radius: 20px;
        border: 1px solid gray;
    }

    .input-search::placeholder{
        color: rgba(128, 128, 128, .5);
    }

    .categories{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        gap: 10px;
        padding: 10px 0;
        font-size: 1.2rem;
        margin: 10px;
    }

    .loading{
        display: flex;
        margin: 20px 0;
        justify-content: center;
    }

    .card-category{
        font-weight: bold;
        color: rgba(255, 0, 0, .7);

        &:hover{
            text-shadow: 0px 0px 2px red;
        }
    }

/* MEDIA QUERIES */
    @media(max-width: 900px){
        input{
            width: 70vw;
        }

        .categories{
            font-size: 1rem;
        }
    }
`