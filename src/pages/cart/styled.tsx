import styled from 'styled-components'
import 'react-credit-cards/es/styles-compiled.css'


export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 15vh 5rem;

    h1{
        text-align: center;
        margin: 20px 0 10vh;
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

    .rest-name{
        text-align: center;
        font-size: 1.5rem;
        margin: 2vh 0;
    }

    .card-container{
        width: 100%;
    }

    .card{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border: .5px solid;
        border-radius: 10px;
        padding: 10px;        
        margin: 0 0 10px;
    }

    .btn-container{
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;

        .input-number{
            width: 50px;
        }
    }

    .btn-remove{
        padding: 10px;
        color: #fff;
        font-size: .8rem;
    }
    
    .card img{
        /* width: 150px;
        height: 150px; */
        border-radius: 10px;  
        box-shadow: 2px 2px 4px;
    }

    /* .select-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 2rem 0 3rem;
        width: 100%;
    }

    .total-price{
        font-size: 1.5rem;
    }

    .select{
        height: 30px;
        font-size: 1rem;
        border-radius: 5px;
    } */

    .totalByGroup{
        font-size: 1.2rem;
    }

    .total-container{
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .requestOrder-btn{
        font-size: 1rem;
        font-weight: bold;
        color: #fff;
        height: 40px;
    }

    .product-name{
        color: #dc2b2b;
        margin: 5px 0 10px;
        font-size: 1.5rem;
    }
/* MEDIA QUERY */
    @media(max-width: 820px){
        .product-name{
            font-size: 1rem;
        }

        .product-details{
            font-size: .7rem;
        }
    }

    @media(max-width: 734px){
        h1{
            font-size: 1.5rem;
        }

        .rest-name{
            font-size: 1.2rem;
        }

        .card{
            flex-direction: column;
            width: 110%;
        }

        .btn-container{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 80%;
            margin: 10px;

            input{
                width: 30%;
            }
        }

        .card img{
            width: 65vw;      
        }

        .total-price{
            font-size: 1rem;
        }
    }

    @media(max-width: 532px){
        .address-section{
            width: 120%;
        }

        .select-container{
            flex-direction: column;
            gap: 10px;

            div{
                font-size: 1rem;
            }
        }
    }

    @media(max-width: 416px){
        .address-section{
            width: 140%;
            font-size: 13px;
        }

        .card{
            width: 130%;
        }
    }

    @media(max-width: 326px){
        .card{
            width: 150%;
        }
    }
`
export const QRCodeBox = styled.div`
    .qrcode-container{
        background-color: rgba(245, 245, 245, .7);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(.1);
        width: 500px;
        border: 2px solid;
        border-radius: 5px;
        box-shadow: 0 0 10px;
        padding: 10px 25px;
        opacity: 0;
        pointer-events: none;
        transition: 1s ease;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        
        @media(max-width: 500px){
            width: 300px;
        }
    }

    .qrcode-container.active{
        opacity: 1;
        pointer-events: auto;
        transform: translate(-50%, -50%) scale(1);
    }

`

export const CreditPayment = styled.div`
    .qrcode-container{
        background-color: rgba(245, 245, 245, .7);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(.1);
        width: 500px;
        border: 2px solid;
        border-radius: 5px;
        box-shadow: 0 0 10px;
        padding: 10px 25px;
        opacity: 0;
        pointer-events: none;
        transition: 1s ease;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    .qrcode-container.active{
        opacity: 1;
        pointer-events: auto;
        transform: translate(-50%, -50%) scale(1);
    }
`