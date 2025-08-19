import { ChangeEvent, FC, useContext, useEffect, useState } from "react"
import Context, { GlobalStateContext } from "../../global/Context"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import Header from "../../components/Header"
import { IoIosArrowBack } from "react-icons/io"
import { FaRegListAlt } from "react-icons/fa"
import { MdEdit } from 'react-icons/md'
import { Order } from "../../types/types"
import { useNavigate } from "react-router-dom"
import { Container } from "./styled"
import { productsImages } from '../../constants/index'



interface GroupedOrders{
    orders:Order[]
    total:number
}


const Cart:FC = ()=>{
    const navigate = useNavigate()
    const { 
        cart, setCart, getAllOrders, 
    } = useContext(Context) as GlobalStateContext
    const fullAddress = cart.length > 0 ? cart[0].address : ''
    const address = fullAddress?.substring(0, fullAddress.indexOf(','))
    const nextPoint = fullAddress?.indexOf(',') + 1
    const cep = fullAddress?.substring(nextPoint, nextPoint + 10)
    const local = fullAddress?.substring(nextPoint + 11, fullAddress.lastIndexOf('-'))
    const referencia = fullAddress?.substring(fullAddress.lastIndexOf('-') + 1, fullAddress.lastIndexOf(','))
    const talkTo = fullAddress?.substring(fullAddress.lastIndexOf(',') + 1, fullAddress.length)
    const calculateTotal = (cart:Order[]) =>
        cart.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0)
    const [total, setTotal] = useState<number>(calculateTotal(cart))



    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        if(!token){
            navigate('/ifuture_react')
        }
        
        getAllOrders()
    }, [])


    useEffect(() => {        
        setTotal(cart.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0))
    }, [cart])



    const groupedByRestaurants = ()=>{
        return cart.reduce<Record<string, GroupedOrders>>((groups, item)=>{
            if(!groups[item.restaurant]){
                groups[item.restaurant] = { orders: [], total: 0}
            }
            groups[item.restaurant].orders.push(item)
            groups[item.restaurant].total += Number(item.total)
            return groups
        }, {})
    }
    

    const handleNumber = (e:ChangeEvent<HTMLInputElement>, id:string)=>{
        const newQuantity = Number(e.target.value)
        const updatedCart = cart.map(item=>{
            if(item.id === id){
                return { ...item, quantity: newQuantity }
            }
            return item
        })

        setCart(updatedCart)
        setTotal(calculateTotal(updatedCart))
        
        axios.patch(`${BASE_URL}/order/${id}`, {
            quantity: newQuantity
        }).then(()=>{
        }).catch(e => alert(e.response.data) )
    }
    

    const removeItem = (cartItem:Order)=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.delete(`${BASE_URL}/order/${cartItem.id}`, headers).then(
            () => getAllOrders()
        ).catch(e=>{
            alert(e.response.data)
        })
    }


    const cleanOrders = (restaurantId:string)=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.delete(`${BASE_URL}/requested_orders/${restaurantId}`, headers).then(
            () => getAllOrders()
        ).catch(e => alert(e.response.data))
    }

    const confirmClearOrders = ()=>{    
        const decide = window.confirm('Tem certeza que deseja deletar sua lista de pedidos?')
        if(decide){
            cleanOrders()
        }
    }
    
    
    const endRequests = (provider:string)=>{
        const newMsg = cart.map(item => `${item.quantity} ${item.product} R$ ${Number(item.price).toFixed(2)} - Total R$ ${item.total}`).join('\n')
        const totalGeral = cart.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0)
        const mensagemUrl = `Novo pedido:\n${newMsg}\nTotal Geral: R$ ${totalGeral}\n\nPara o endereço: ${address}\nCEP: ${cep}\nLocal: ${local}\n${referencia}\nFalar com: ${talkTo}`
        const url = `https://wa.me/5571984407882?text=${encodeURIComponent(mensagemUrl)}`

        window.open(url, '_blank')  
        cleanOrders(provider)      
    }
    
        


    return(
        <>
        <Header
            leftIcon={
                <IoIosArrowBack 
                    className="header-icon"
                    onClick={()=> navigate(-1)} />
            }
            center={ <div/> }
            rightIcon={
                <FaRegListAlt className="header-icon"
                onClick={() => navigate('/ifuture_react/')} />
            }/>
        <Container>
            <h1>Meu Carrinho</h1>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="address-section">
                <div>
                    <b>Endereço</b>: {address}<br />
                    <b>CEP</b>: {cep}<br />
                    <b>Local</b>: {local}<br />
                    <b>Ponto de referência</b>: {referencia} <br />
                    <b>Falar com</b>: {talkTo}
                </div>
                <MdEdit className="icon" onClick={()=> {
                    navigate('/ifuture_react/address')
                }} />
            </div>
            {!fullAddress && (
                <div>
                    Necessário adicionar um endereo para entrega.<br />
                    Clique no ícone do lápis para adicionar
                </div>
            )}
            {cart.length > 0 && (
                <button 
                    type="button"
                    style={{padding:10, color:'white', marginTop:30, fontSize:'1rem'}}
                    onClick={confirmClearOrders}>
                    Limpar Lista
                </button>
            )}
            <div className="addressAndName">
                <div className="rest-name">Seus produtos</div>
            </div>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            {cart.length > 0 ? Object.entries(groupedByRestaurants()).map(([restaurant, group])=>(
                <div key={restaurant} className="card-container">
                    {group.orders.map(item => (
                        <div key={item.id} className="card">
                            <span>
                                <img src={productsImages[item.photoUrl]}  alt="Imagem do produto" />
                            </span>
                            <span>
                                <div className="product-name">{item.product}</div>
                                <div className="product-details">
                                    <b>Quantidade: </b>{item.quantity} <br />
                                    <b>Preço: </b>R$ {Number(item.price).toFixed(2)} <br />
                                    <b>Total: </b>R$ {(Number(item.price) * Number(item.quantity)).toFixed(2)} <br />
                                </div>
                            </span>
                            <div className="btn-container">
                                <input 
                                    type="number"
                                    min={1} 
                                    value={item.quantity}
                                    onChange={(e) => handleNumber(e, item.id)}
                                    className="input-number" />                 
                                <button className="btn-remove" onClick={()=> removeItem(item)} >Remover</button> 
                            </div>
                        </div>
                    ))}
                    <div className="total-container">
                        <div className="totalByGroup"><b>Total</b>: R$ {Number(group.total).toFixed(2)}</div>
                        <hr style={{background:'lightgray', margin:'3px', width:'10%'}} />
                        <button 
                            className="requestOrder-btn"
                            style={{background: cart.length > 0 && fullAddress ? 'red' : 'gray'}}
                            disabled={cart.length === 0 || !fullAddress}
                            onClick={() => endRequests(restaurant)}>
                            Finalizar Pedido
                        </button>
                        <hr style={{width:'20%', marginBottom:'15px', marginTop:'10px', background:'lightgray'}} />
                    </div>
                </div>
            )) : <div style={{margin:10}}>Você ainda não fez nenhum pedido</div> }
            {/* <div className="select-container">
                <div className="total-price">Total da compra: R$ {Number(total).toFixed(2)}</div>
            </div>
            <button 
                className="requestOrder-btn"
                style={{background: cart.length > 0 && fullAddress ? 'red' : 'gray'}}
                disabled={cart.length === 0 || !fullAddress}
                onClick={() => endRequests()}>
                Finalizar Pedido
            </button> */}
        </Container>
        </>
    )
}

export default Cart