import { ChangeEvent, FC, useContext, useEffect, useState } from "react"
import Context, { GlobalStateContext } from "../../global/Context"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import Header from "../../components/Header"
import { IoIosArrowBack } from "react-icons/io"
import { MdEdit } from 'react-icons/md'
import { Order } from "../../types/types"
import { useNavigate } from "react-router-dom"
import { Container, } from "./styled"



const Cart:FC = ()=>{
    const navigate = useNavigate()
    const { 
        cart, setCart, getAllOrders, setUpdateAddress
    } = useContext(Context) as GlobalStateContext
    const fullAddress = cart.length > 0 ? cart[0].address : ''
    const address = fullAddress?.substring(0, fullAddress.indexOf(','))
    const nextPoint = fullAddress?.indexOf(',') + 1
    const cep = fullAddress?.substring(nextPoint, nextPoint + 10)
    const local = fullAddress?.substring(nextPoint + 11, fullAddress.lastIndexOf('-'))
    const referencia = fullAddress?.substring(fullAddress.lastIndexOf('-') + 1, fullAddress.lastIndexOf(','))
    const talkTo = fullAddress?.substring(fullAddress.lastIndexOf(',') + 1, fullAddress.length)
    const [total, setTotal] = useState<number>(cart.reduce((acc, item) => acc + Number(item.total) * Number(item.quantity), 0))



    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        if(!token){
            navigate('/ifuture_react')
        }
        
        getAllOrders()

        setTotal(cart.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        
        setTotal(cart.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0))
    }, [cart])
    

    const handleNumber = (e:ChangeEvent<HTMLInputElement>, id:string)=>{
        const newQuantity = Number(e.target.value)
        const updatedCart = cart.map(item=>{
            if(item.id === id){
                return { ...item, quantity: newQuantity }
            }
            return item
        })

        setCart(updatedCart)
        setTotal(cart.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0))
        
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


    const cleanOrders = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        if(cart.length === 0){
            alert('Sua lista de pedidos está vázia')

            return
        }

        const decide = window.confirm('Tem certeza que deseja deletar sua lista de pedidos?')
        if(decide){
            axios.delete(`${BASE_URL}/requested_orders`, headers).then(
                () => getAllOrders()
            ).catch(e => alert(e.response.data))
        }
    }
    
    
    const endRequests = ()=>{
        const produtos = cart.map(item => item.product).join(',')
        const mensagemUrl = `Novo pedido:\n${produtos}\nPara o endereço: ${address}\nCEP: ${cep}\nLocal: ${local}\n${referencia}\nFalar com: ${talkTo}`
        const url = `https://wa.me/5571982551522?text=${encodeURIComponent(mensagemUrl)}`
        
        window.open(url, '_blank')
    }
    
        


    return(
        <>
        <Header
            leftIcon={
                <IoIosArrowBack 
                    className="header-icon"
                    onClick={()=> navigate(-1)} />
            }
            rightIcon={
                <div/>
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
                    setUpdateAddress(true)
                    navigate('/ifuture_react/address')
                }} />
            </div>
            {fullAddress === null && (
                <div>
                    Necessário adicionar um endereo para entrega.<br />
                    Clique no ícone do lápis para adicionar
                </div>
            )}
            {cart.length > 0 && (
                <button 
                    type="button"
                    style={{padding:10, color:'white', marginTop:30, fontSize:'1rem'}}
                    onClick={cleanOrders}>
                    Limpar Lista
                </button>
            )}
            <div className="addressAndName">
                <div className="rest-name">Seus produtos</div>
            </div>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            {cart.length > 0 ? cart.map(item=>(
                <div key={item.id} className="card">
                    <span>
                        <img src={item.photoUrl}  alt="Imagem do produto" />
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
            )) : <div style={{margin:10}}>Você ainda não fez nenhum pedido</div> }
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="select-container">
                <div className="total-price">Total da compra: R$ {Number(total).toFixed(2)}</div>
            </div>
            <button 
                className="requestOrder-btn"
                style={{background: cart.length > 0 && fullAddress !== null ? 'red' : 'gray'}}
                disabled={cart.length > 0 && fullAddress !== null ? false : true}
                onClick={() => endRequests()}>
                Finalizar Pedido
            </button>
        </Container>
        </>
    )
}

export default Cart