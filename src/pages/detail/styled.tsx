import styled from 'styled-components'


export const Container = styled.div`
    margin-top: 15vh;
    h1{
        text-align: center;
        margin: 5vh 0 3vh;
    }
    .card{
        border: 1px solid red;
        width: 50vw;
        margin: auto;
    }

    .image{
        width: 50vw;
        height: 50vh;
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
        padding-top: 20px;
    }

    .products{
        border-bottom: 1px solid gray;
        text-align: center;
        padding: 10px;
        margin: 10px;
    }

    .product-desc{
        margin: 10px;
    }

    .products-card{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20px;
        border: 1px solid;
        border-radius: 10px;
        margin: 10px;
    }

    .product-image{
        width: 100px;
        height: 130px;	
        border-radius: 10px;
    }

    .select-btn-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .products-card button{
        padding: 5px;
        color: #fff;
    }

/* MEDIA QUERIES */
    @media(max-width: 830px){
        .image{
            height: 90%;
        }

        .desc{
            font-size: 85%;
        }

        .products-card{
            /* display: flex;
            align-items: center;
            justify-content: space-between;
            padding-right: 20px;
            border: 1px solid;
            border-radius: 10px;
            margin: 10px; */
            flex-direction: column;
        }

        .product-image{
            width: 100%;
        }

        .select-btn-container{
            justify-content: space-between;
            width: 100%;
            padding: 5px 10px;
            flex-direction: row-reverse;
        }

        .select{
            width: 20%;
        }
    }

    @media(max-width: 620px){
        .image{
            height: 80%;
        }
    }

`