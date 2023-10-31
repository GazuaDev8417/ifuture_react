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

    .card{
        display: flex;
        flex-direction: column;
        border: 1px solid red;
        margin: 20px auto 50px;
        width: 50vw;
        cursor: pointer;
    }

    .image{
        height: 50vh;
        width: 50vw;
    }

    .desc{
        margin: 10px 20px;
    }

    .rest-name{
        text-align: center;
        font-size: 1.5rem;
        margin: 10px;
    }

    .time{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`