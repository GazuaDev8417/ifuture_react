import styled from 'styled-components'


const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid red;
    margin: 20px auto 50px;
    width: 50vw;
    cursor: pointer;

    .image{
        height: 50vh;
        width: 49.5vw;
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

/* MEDIA QUERIES */
    @media(max-width: 830px){
        width: 70vw;

        .image{
            width: 69.5vw;
        }
    }

    @media(max-width: 390px){
        .image{
            width: 69vw;
        }
    }
`


interface RestaurantCardProps{
    id:string
    logourl:string
    name:string
    /* deliveryTime:number
    shipping:number */
    getRestaurantById: (id:string)=> void
}


const RestaurantCard = (props:RestaurantCardProps)=>{
    return(
        <Card>
            <img 
                src={props.logourl}
                alt="Imagem do restaurante"
                className="image"
                onClick={()=> props.getRestaurantById(props.id)} />
            <div className="desc">
                <div className="rest-name">{props.name}</div>
                {/* <div className="time">
                    <span>{props.deliveryTime} - {props.deliveryTime + 10} min</span>
                    <span>Frete: R$ {props.shipping.toFixed(2)}</span>
                </div> */}
            </div>
        </Card>
    )
}

export default RestaurantCard