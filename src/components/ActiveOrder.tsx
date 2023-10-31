import { useContext } from 'react'
import Context, { GlobalStateContext } from '../global/Context'
import styled from 'styled-components'
import { Order } from '../types/types'


const Container = styled.div`
    border: 1px solid;
    border-radius: 10px;
    width: 100%;
    padding: 5px 10px;
    margin: 5px 0;
    line-height: 30px;

    .rest-name{
        color: #dc2b2b;
        font-size: 1.3rem;
        font-weight: bold;
    }

    table{
        width: 80%;
        margin: auto;
    }  
    
    .btn-column{
        text-align: center;
    }

    .close-btn{
        margin-top: 30px;
        width: 50%;
        padding: 5px;
        color: #fff;
        font-size: 1rem;
    }
`

const ActiveOrder = ({ restaurantName, createdAt, totalPrice, expiresAt }:Order)=>{
    const { setShowOrder } = useContext(Context) as GlobalStateContext


    return(
        <Container>
            <div className="rest-name">{restaurantName}</div>
            <table>
                <tr>
                    <td><b>Data do pedido</b></td>
                    <td><b>Expiração do pedido</b></td>
                    <td><b>Total</b></td>
                </tr>
                <tr>
                    <td>
                        {new Date(createdAt).toLocaleDateString()} às {new Date(createdAt).toLocaleTimeString()}
                    </td>
                    <td>
                        {new Date(expiresAt).toLocaleDateString()} às {new Date(expiresAt).toLocaleTimeString()}
                        
                    </td>
                    <td>
                        R$ {totalPrice.toFixed(2)}
                    </td>                    
                </tr>
                <tr>
                    <td colSpan={3}
                        className='btn-column'>
                        <button
                            onClick={()=> setShowOrder(false)} 
                            className='close-btn'>Fechar</button>
                    </td>
                </tr>
            </table>
        </Container>
    )
}


export default ActiveOrder