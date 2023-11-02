import { ChangeEvent, FC, useContext, useEffect, useState } from "react"
import Context, { GlobalStateContext} from "../../global/Context"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import Header from "../../components/Header"
import { AiFillHome } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'
import { CartItem, Order } from "../../types/types"
import { useNavigate } from "react-router-dom"
import { Container } from "./styled"
import ActiveOrder from "../../components/ActiveOrder"
import Payment_methods from "../../components/payment/Payment_methods"



const Cart:FC = ()=>{
    const navigate = useNavigate()
    const [payment, setPayment] = useState<string>('money')
    const [selectedValue, setSelectedValue] = useState<string>('')
    const [order, setOrder] = useState<Order>({
        restaurantName:'',
        createdAt: 0,
        expiresAt: 0,
        totalPrice: 0
    })
    const { 
        cart, setCart, user, getProfile, showOrder, setShowOrder
    } = useContext(Context) as GlobalStateContext
    

    
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        if(!token){
            navigate('/ifuture_react')
        }

        getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleSelect = (e:ChangeEvent<HTMLSelectElement>)=>{
        setPayment(e.target.value)
    }

    const handleRadioButton = (e:ChangeEvent<HTMLInputElement>)=>{
        setSelectedValue(e.target.value)
    }

    const removeItem = (cartItem:CartItem)=>{
        const newCart = cart.filter(item => item.id !== cartItem.id)
        setCart(newCart)
    }

    const requestActiveOrder = ()=>{
        axios.get(`${BASE_URL}/active-order`, {
            headers: { auth: localStorage.getItem('token') }
        }).then(res=>{
            setOrder(res.data.order)
            if(res.data.order === null){
                alert('Não há pedido ativo')
            }else{
                setShowOrder(true)
            }
        }).catch((e)=>{
            alert(e.response.data.message)
        })
    }   
    
    
    const buyProduct = (item:CartItem)=>{
        const body = {
            products: [
                {
                    id: item.id,
                    quantity: item.quantity
                }
            ],
            paymentMethod: payment
        }

        if(!selectedValue){
            alert('Selecione uma forma de pagamento')
            return
        }

        axios.post(`${BASE_URL}/restaurants/${item.restaurantId}/order`, body, {
            headers: { auth: localStorage.getItem('token') }
        }).then((res)=>{
            console.log(res)
            alert(`Compra realizada com ${selectedValue}`)
            removeItem(item)
        }).catch(e=>{
            alert(e.response.data.message)
        })
    }


    return(
        <>
        <Header
            leftIcon={
                <AiFillHome 
                    className="header-icon"
                    onClick={()=> navigate('/ifuture_react/feed')} />
            }
            rightIcon={
                <BsFillPersonFill 
                    className="header-icon"
                    onClick={()=> navigate('/ifuture_react/profile')} />
            }/>
        <Container>
            <h1>Meu Carrinho</h1>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="address-section">
                <div>Endereço para entrega: <br />
                    {user.address}
                </div>
                <MdEdit className="icon" onClick={()=> navigate('/ifuture_react/update-address')} />
            </div>
            <div className="addressAndName">
                <div className="rest-name">Seus produtos</div>
            </div>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            {cart && cart.map(item=>(
                <div key={item.id} className="card">
                    <span>
                        <img src={item.image}  alt="Imagem do produto" />
                    </span>
                    <span>
                        <div className="product-name">{item.name}</div>
                        <div>
                            <b>Descrição: </b>{item.description} <br />
                            <b>Quantidade: </b>{item.quantity} <br />
                            <b>Preço: </b>R$ {item.price.toFixed(2)} <br />
                            <b>Total: </b>{((item.price) * (item.quantity)).toFixed(2)} <br />
                        </div>
                    </span>
                    <div className="btn-container">
                        <button className="btn-remove" onClick={()=> removeItem(item)} >Remover</button>
                        <button className="btn-remove" onClick={()=> buyProduct(item)} >Comprar</button>                        
                    </div>
                </div>
            ))}
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <Payment_methods 
                paymentMethod={payment}
                handleRadioButton={handleRadioButton}
                selectedValue={selectedValue}/>
            <div className="select-container">
                <select className="select" value={payment} onChange={handleSelect}>
                    <option value="money" defaultChecked>Dinheiro</option>
                    <option value="creditcard">Cartão de crédito</option>
                </select>
            </div>
            <button onClick={requestActiveOrder} className="requestOrder-btn">
                Consultar pedido ativo
            </button>
            {
                showOrder && (
                    <ActiveOrder 
                        restaurantName={order.restaurantName}
                        createdAt={order.createdAt}
                        totalPrice={order.totalPrice}
                        expiresAt={order.expiresAt} />
                )
                
            }
        </Container>
        </>
    )
}

export default Cart