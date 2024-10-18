import { ChangeEvent, FC, useContext, useEffect, useState } from "react"
import Context, { GlobalStateContext } from "../../global/Context"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import Header from "../../components/Header"
import { AiFillHome } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { QRCodeSVG } from 'qrcode.react'
import { MdEdit } from 'react-icons/md'
import { Order } from "../../types/types"
import { useNavigate } from "react-router-dom"
import { Container, QRCodeBox } from "./styled"
import Payment_methods from "../../components/payment/Payment_methods"



const Cart:FC = ()=>{
    const navigate = useNavigate()
    const [payment, setPayment] = useState<string>('money')
    const [selectedValue, setSelectedValue] = useState<string>('')
    const [showQRcode, setShowQRcode] = useState<boolean>(false)
    const [cartLength, setCartLength] = useState<boolean>(false)
    const [textPopup ,setTextPopup] = useState<boolean>(false)
    const { 
        cart, user, getProfile, getAllOrders, setUpdateAddress, allFieldsFilled, setAllfieldsFilled
    } = useContext(Context) as GlobalStateContext
    const [total, setTotal] = useState<number>(cart.reduce((acc, item) => acc + item.total, 0))

    
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        if(!token){
            navigate('/ifuture_react')
        }

        getProfile()
        getAllOrders()
        if(cart.length === 0){
            setSelectedValue('')
            setCartLength(false)
            setAllfieldsFilled(false)
        }else{
            setCartLength(true)
        }
        setTotal(cart.reduce((acc, item) => acc + item.total, 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])


    useEffect(()=>{
        const handleKeydown = (e:KeyboardEvent)=>{
            if(e.key === 'Escape' || e.key === 'Esc'){
                setShowQRcode(false)
                //setShowCreditCard(false)
                setSelectedValue('')
            }
        }

        document.addEventListener('keydown', handleKeydown)
        return () =>{
            document.removeEventListener('keydown', handleKeydown)
        }
    }, [])


    const handleSelect = (e:ChangeEvent<HTMLSelectElement>)=>{
        setPayment(e.target.value)
        
        if(e.target.value !== 'money'){
            setSelectedValue('')
        }else{
            setAllfieldsFilled(false)
        }
    }

    const handleNumber = (e:ChangeEvent<HTMLInputElement>, id:string)=>{
        const newQuantity = Number(e.target.value)
        const updatedCart = cart.map(item=>{
            if(item.id === id){
                //const newTotal = item.price * newQuantity
                return { ...item, quantity: newQuantity/* , total: newTotal */ }
            }
            return item
        })
        const headers = {
            headers: { Authorization: localStorage.getItem('token')}
        }

        //setCart(updatedCart)
        
        axios.patch(`${BASE_URL}/order/${id}`, {
            quantity: newQuantity
        }, headers).then(()=>{
            getAllOrders()
        }).catch(e => alert(e.response.data) )

        setTotal(updatedCart.reduce((acc, cart) => acc + cart.total, 0))
    }


    const handleRadioButton = (e:ChangeEvent<HTMLInputElement>)=>{
        if(cart.length === 0){
            alert('Você ainda não fez nenhum pedido')
            setShowQRcode(false)
            // setShowCreditCard(false)
            return
        }

        setSelectedValue(e.target.value)
        if(e.target.value === 'PayPal' && cart.length > 0){
            setShowQRcode(true)
        }else{
            setShowQRcode(false)
        }
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


    const handleCopy = (textToCopy:string)=>{
        navigator.clipboard.writeText(textToCopy).then(()=>{
            setTextPopup(true)
            setShowQRcode(true)
            setTimeout(()=>{
                setShowQRcode(false)
            }, 1000)
        }).catch(e=>{
            alert(`Erro ao copiar: ${e}`)
        })
    }


    const cleanOrders = async()=>{
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
    
    
   
    const endRequests = (id:string)=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token')}
        }

        /* if(payment === 'money' && selectedValue === ''){
            return alert('Selecione um método de pagamento')
        } */

        axios.patch(`${BASE_URL}/finished_orders/${id}`, headers).then(res=>{
            alert(res.data)
            setAllfieldsFilled(false)
            getAllOrders()
        }).catch(e => alert(e.response.data))
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
        <Container className={showQRcode ? 'active' : ''}>
            <h1>Meu Carrinho</h1>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="address-section">
                <div>Endereço para entrega: <br />
                    {user.street} {user.number}, {user.neighbourhood}<br/>
                    {user.city} - {user.state}
                </div>
                <MdEdit className="icon" onClick={()=> {
                    setUpdateAddress(true)
                    navigate('/ifuture_react/address')
                }} />
            </div>
            <button 
                type="button"
                style={{padding:10, color:'white', marginTop:30}}
                onClick={cleanOrders}>
                Limpar Pedidos
            </button>
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
                        <div>
                            {/* <b>Descrição: </b>{item.description} <br /> */}
                            <b>Quantidade: </b>{item.quantity} <br />
                            <b>Preço: </b>R$ {item.price.toFixed(2)} <br />
                            <b>Total: </b>R$ {((item.price) * (item.quantity)).toFixed(2)} <br />
                        </div>
                    </span>
                    <div className="btn-container">
                        <input 
                            type="number"
                            min={1} 
                            value={item.quantity}
                            onChange={(e) => handleNumber(e, item.id)}
                            name="" 
                            id="" />                 
                        <button className="btn-remove" onClick={()=> removeItem(item)} >Remover</button> 
                    </div>
                </div>
            )) : <div style={{margin:10}}>Você ainda não fez nenhum pedido</div> }
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <Payment_methods 
                paymentMethod={payment}
                handleRadioButton={handleRadioButton}
                selectedValue={selectedValue}
                textPopup={textPopup}
                setTextPopup={setTextPopup}
                setShowQRcode={setShowQRcode}
                cartLength={cartLength}
                //total={total}
                />
            <div className="select-container">
                <select className="select" value={payment} onChange={handleSelect}>
                    <option value="money" defaultChecked>Dinheiro</option>
                    <option value="creditcard">Cartão de crédito</option>
                </select>
                <div className="total-price">Total da compra: R$ {total.toFixed(2)}</div>
            </div>
            <button 
                className="requestOrder-btn"
                style={{background: allFieldsFilled || selectedValue !== '' ? 'red' : 'gray'}}
                disabled={allFieldsFilled || selectedValue !== '' ? false : true}
                onClick={() => endRequests(user.id)}>
                Finalizar Compra
            </button>
        </Container>
        <QRCodeBox>
            <div className={`qrcode-container ${showQRcode ? 'active' : ''}`}>
                <small style={{background:'white'}}>
                    Lembrando que o projeto se trata de uma simulação, então este QRCode representa nada mais
                    que o valor total dos pedidos, não copiando nenhuma chave ou código de barras.
                </small>
                <QRCodeSVG value={`Valor total: R$ ${total}`} size={250} />
                {textPopup && <span className="textPopup">Copiado!</span>}
                <button style={{padding:10}} onClick={() => handleCopy(String(total.toFixed(2)))}>Copiar</button>
            </div>
        </QRCodeBox>
        </>
    )
}

export default Cart