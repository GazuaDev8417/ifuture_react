import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    /* justify-content: center; */
    margin: 15vh 5rem;

    @media(max-width: 517px){
        margin: 15vh 1.5rem;
    }

    h1{
        text-align: center;
        margin: 5vh 0 10vh;
    }

    .logout-icon{
        position: absolute;
        top: 1.5%;
        right: 2%;
        font-size: 2rem;
        cursor: pointer;
    }

    .user-section{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0 0 20px;
        line-height: 30px;
        border-radius: 10px;
    }    

    .address-section{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background-color: lightgray;
        padding: 10px;
        line-height: 30px;
        border-radius: 10px;
    }

    .addressAndName{
        margin: 20px 0 10px;
        line-height: 30px;
    }

    .icon{
        font-size: 1.5rem;
        cursor: pointer;
    }

    hr{
        width:'100%';
        background:'lightgray';
    }

    .order-history{
        font-size: 1.5rem;
        margin: 5vh 0 3vh;
    }

    .card-container{
        display: flex;
        flex-wrap: wrap;
    }

    .card{
        border: 1px solid;
        border-radius: 10px;
        width: 100%;
        padding: 5px 10px;
        margin: 5px 0;
        line-height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .rest-name{
        color: #dc2b2b;
        font-size: 1.2rem;
    }
    
    a{
        color: blue;
    }
    a:hover{
        cursor: pointer;
    }

/* MEDIA QUERY */
    @media(max-width: 660px){
        h1{
            font-size: 1.5rem;
        }

        .order-history{
            font-size: 1.2rem;
        }
    }
`