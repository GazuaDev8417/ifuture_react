import styled from 'styled-components'


export const Container = styled.div`
    margin-top: 18.5vh;

    input{
        width: 50vw;
        box-shadow: 2px 2px 4px;
        border-radius: 20px;
        border: 1px solid gray;
    }

    .input-search::placeholder{
        color: rgba(128, 128, 128, .5);
    }

    .input-search{
        position: fixed;
        top: 13%;
        left: 50%;
        transform: translateX(-50%);
    }

    .categories{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        gap: 10px;
        font-size: 1.2rem;
        padding-top: 15px;
    }

    .loading{
        display: flex;
        margin: 20px 0;
        justify-content: center;
    }

    .no-results{
        text-shadow: 2px 2px 4px;
        font-size: 1.2rem;
        font-weight: bold;
        margin-top: 10vh;
        text-align: center;
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