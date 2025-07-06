import { useContext, useEffect, useState } from 'react'
import Context, { GlobalStateContext } from '../../global/Context'
import { useNavigate } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'
import { AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai'
import { MdDelete } from "react-icons/md";
import Header from "../../components/Header"
import formatPhoneNumber from '../../utils/formatPhoneNumber'
import { Container } from './styled'
import { BASE_URL } from '../../constants/url'
import axios from 'axios'
import { Order } from '../../types/types'



const Profile = ()=>{
    const navigate = useNavigate()
    const { user, getProfile, setUpdateAddress, getRestaurantById } = useContext(Context) as GlobalStateContext
    const [orders, setOrders] = useState<Order[]>([])
    const [hoveredItemId, setHoveredItemId] = useState<string>('')

    


    useEffect(()=>{
        getProfile()
        orderHistory()
    }, [])

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(!token){
            navigate('/ifuture_react')
        }
    }, [])




    const orderHistory = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.get(`${BASE_URL}/active_orders`, headers).then(res=>{
            setOrders(res.data)
        }).catch(e => alert(e.response.data))
    }


    const logout = ()=>{
        const decide = window.confirm('Tem certeza que deseja deslogar?')

        if(decide){
            localStorage.clear()
            navigate('/ifuture_react')
        }
    }


    const deleteOrder = (id:string)=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.delete(`${BASE_URL}/order/${id}`, headers).then(()=>{
            orderHistory()
        }).catch(e => alert(e.response.data))
    }


    const cleanHistory = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        if(orders.length === 0){
            alert('Seu histórico está vázio!')

            return
        }

        const decide = window.confirm('Tem certeza que deseja apagar todo seu histórico?')
        if(decide){
            axios.delete(`${BASE_URL}/orders`, headers).then(()=>{
                orderHistory()
            }).catch(e => alert(e.response.data))
        }
    }
    


    
    return(
        <>
        <Header
            rightIcon={
                <AiOutlineLogout className="header-icon" onClick={logout} />
            }
            leftIcon={
                <AiOutlineShoppingCart className="header-icon" onClick={()=> navigate('/ifuture_react/cart')}/>
            }/>        
        <Container>    
            <h1>Perfil do usuário</h1>            
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="user-section">
                <div>
                    <span className='properties'>Nome:</span> {user.username} <br />
                    <span className='properties'>Email:</span> {user.email} <br />
                    <span className='properties'>Telefone:</span> {formatPhoneNumber(user.phone)}
                </div>
                <MdEdit className="icon" onClick={()=> navigate('/ifuture_react/edit-profile')} />
            </div>
            <div className="address-section">
                <div style={{width:'100%'}}>
                    <div style={{textAlign:'center', fontSize:'1.5rem', marginBottom:10}}>Endereço cadastrado:</div>
                    <div style={{maxWidth:'90%'}}>
                        <span className="properties">Local:</span> {user.street} {user.number ? user.number : 'S/N'} <br />
                        <span className="properties">Bairro:</span> {user.neighbourhood} <br />
                        <span className="properties">Cidade/Estado:</span> {user.city} - {user.state} <br />
                        <span className="properties">CEP:</span> {user.cep}
                    </div>
                </div>
                <MdEdit className="icon" onClick={()=> {
                    navigate('/ifuture_react/address')
                    setUpdateAddress(true)
                }}/>
            </div>
            <div className="addressAndName">
                <div className="rest-name"></div>
                <div></div>
            </div>
            {orders.length > 0 && <button type="button" style={{padding:10, color:'white'}} onClick={cleanHistory}>
                Limpar Histórico
            </button>}
            <div id='history' className="order-history">Histórico de pedidos</div>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="card-container">
                {orders && orders.map(order=>(
                    <div className="card" key={order.id}>
                        <div className="card-content">
                            <div className="rest-name">{order.product} R$ {order.price.toFixed(2)}</div>
                            <b>Pedido feito em:</b> {order.moment} <br/>
                            <b>Quantidade:</b> {order.quantity}<br/>
                            <b>Total:</b> R$ {order.total.toFixed(2)}<br/>
                            <b>Restaurante:</b> Clique <a onClick={() =>{
                                localStorage.setItem('selectedOrderId', order.id)
                                localStorage.setItem('restaurantId', order.restaurant)
                                getRestaurantById(order.restaurant)
                                navigate(`/ifuture_react/detail`)
                            }}>aqui</a> para ver o restaurante do pedido
                        </div>
                        <MdDelete className='icon' style={{
                                color: hoveredItemId === order.id ? 'red' : 'black'
                            }}
                            onMouseOver={() => setHoveredItemId(order.id)}
                            onMouseOut={() => setHoveredItemId('')}
                            onClick={() => deleteOrder(order.id)}/>
                    </div>
                ))}
            </div>
        </Container>
        </>
    )
}

export default Profile