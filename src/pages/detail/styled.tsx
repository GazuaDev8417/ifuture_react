import styled from 'styled-components'




export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    display: none;
    transition: 1s;
    z-index: 900;

    &.active{
        display: block;
    }
`

export const Sidebar = styled.div`
    position: fixed;
    top: 0;
    right: -250px;
    width: 250px;
    height: 100%;
    background: #fff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, .2);
    transition: right .3s ease-in-out;
    z-index: 1000;

    &.active{
        right: 0;
    }

    h3{
        text-align: center;
        padding: 10px 0;
        border-bottom: 1.5px solid gray;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        padding: 20px 30px;
        border-bottom: 1px solid lightgray;
        cursor: pointer;
        transition: .3s ease-in-out;

        &:hover{
            color: #d33;
            transform: translateX(10%);
        }

        &:active{
            transform: scale(.9);
        }
    }
`

export const Container = styled.div`
    margin-top: 25vh;
    h1{
        text-align: center;
        margin: 5vh 0 3vh;
    }
    .card{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid red;
        width: 70vw;
        margin: auto;
    }

    .image{
        /* width: 50vw;
        height: 50vh; */
        margin-top: 20px;
        box-shadow: 2px 2px 4px;
        border-radius: 10px;
    }

    .desc{
        margin: 30px 20px;
    }

    .rest-name{
        text-align: center;
        font-size: 1.5rem;
        margin: 20px 10px 10px;
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
        box-shadow: 2px 2px 4px;
        margin: 10px;
        padding: 10px;
    }

    .product-image{
        /* width: 100px;
        height: 130px; */	
        border-radius: 10px;
        box-shadow: 2px 2px 4px;
    }

    .select-btn-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .products-card button{
        padding: 10px;
        color: #fff;
        font-size: 1.2rem;
        width: 100px;
    }

/* MEDIA QUERIES */
    @media(max-width: 830px){
        .card{
            width: 80vw;
        }

        .image{
            height: 70vh;
            width: 70vw;
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
            padding: 10px;
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