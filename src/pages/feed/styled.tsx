import styled from 'styled-components'


export const Container = styled.div`
    margin-top: 15vh;
    .input-container{
        margin-top: 5vh;
        text-align: center;
    }

    input{
        width: 50vw;
    }

    .categories{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        gap: 10px;
        padding: 10px 0;
        font-size: 1.2rem;
    }

    .loading{
        display: flex;
        margin: 20px 0;
        justify-content: center;
    }

/* MEDIA QUERIES */
    @media(max-width: 900px){
        input{
            width: 70vw;
        }

        .categories{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            width: 70vw;
            margin: auto;            
        }

        .card-category{
            font-size: 80%;;
        }
    }
`