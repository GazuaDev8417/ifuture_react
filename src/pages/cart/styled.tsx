import styled from 'styled-components'
import 'react-credit-cards/es/styles-compiled.css'


export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 15vh 5rem;

    &.active{
        filter: blur(3px);
        pointer-events: none;
    }

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

    .card{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border: .5px solid;
        border-radius: 10px;
        padding-right: 20px;        
        margin: 0 0 10px;
    }

    .btn-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .btn-remove{
        padding: 5px;
        color: #fff;
    }
    
    .card img{
        width: 150px;
        height: 150px;
        border-radius: 10px;    
        
        @media(max-width: 660px){
            width: 600px;
        }
    }

    .subtotal{
        margin: 20px 0 15px;
        font-size: 1.2rem;
    }

    .select-container{
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
    }

    .requestOrder-btn{
        font-size: 1rem;
        font-weight: bold;
        color: #fff;
        height: 40px;
        width: 100%;  
    }

    .product-name{
        color: #dc2b2b;
        margin: 5px 0 10px;
        font-size: 1.5rem;
    }
/* MEDIA QUERY */
    @media(max-width: 660px){
        h1{
            font-size: 1.5rem;
        }

        .rest-name{
            font-size: 1.2rem;
        }

        .card{
            flex-direction: column;
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
        .select-container{
            flex-direction: column;
            gap: 10px;

            div{
                font-size: 1rem;
            }
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