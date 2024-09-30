import { useContext, useEffect, useState } from 'react'
import Context, { GlobalStateContext } from '../../global/Context'
import { useNavigate } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'
import { AiOutlineLogout, AiFillHome } from 'react-icons/ai'
import { MdDelete } from "react-icons/md";
import Header from "../../components/Header"
import { Container } from './styled'
import { BASE_URL } from '../../constants/url'
import axios from 'axios'
import { Order } from '../../types/types'



const Profile = ()=>{
    const navigate = useNavigate()
    const { user, getProfile, setMenu, setUpdateAddress } = useContext(Context) as GlobalStateContext
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



    const getRestaurantById = (id:string)=>{
        axios.get(`${BASE_URL}/restaurants/${id}`, {
        }).then(res=>{
            setMenu(res.data) 
            navigate('/ifuture_react/detail')        
        }).catch(e=>{
            alert(e.response.data)
            console.log(e)
        })
    }


    const orderHistory = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.get(`${BASE_URL}/active_orders`, headers).then(res=>{
            setOrders(res.data)
        }).catch(e => alert(e.response.data))
    }


    const maskedCPF = (cpf:string)=>{
        if(cpf){
            const digitsToMask = cpf.length - 3
            const maskDigits = '*'.repeat(digitsToMask)
            const lastDigits = cpf.slice(-3)
            const result = maskDigits + lastDigits
    
            return result
        }
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


    const deleteUser = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        const decide = window.confirm('Tem certeza que deseja apagar sua conta?')
        if(decide){
            axios.delete(`${BASE_URL}/user`, headers).then(()=>{
                localStorage.clear()
                navigate('/ifuture_react')
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
                <AiFillHome className="header-icon" onClick={()=> navigate('/ifuture_react')}/>
            }/>        
        <Container>    
            <h1>Perfil do usuário</h1>            
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="user-section">
                <div>{user.username} <br />
                    {user.email} <br />
                </div>
                <MdEdit className="icon" onClick={()=> navigate('/ifuture_react/edit-profile')} />
            </div>
            <div className="address-section">
                <div>Endereço cadastrado: <br />
                    {user.street} Nº {user.number}, {user.neighbourhood}, {user.city} - {user.state}
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
            <button type="button" style={{padding:10, color:'white'}} onClick={deleteUser}>
                Deletar conta
            </button>
            <div id='history' className="order-history">Histórico de pedidos</div>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            {orders && orders.map(order=>(
                <div className="card" key={order.id}>
                    <div className="card-content">
                        <div className="rest-name">{order.product}</div>
                        Pedido feito em: {order.moment} <br/>
                        Quantidade: {order.quantity}<br/>
                        Total: R$ {order.total}<br/>
                        Restaurante: Clique <a onClick={() => getRestaurantById(order.restaurant)}>aqui</a> para ver o restaurante do pedido
                    </div>
                    <MdDelete className='icon' style={{
                            color: hoveredItemId === order.id ? 'red' : 'black'
                        }}
                        onMouseOver={() => setHoveredItemId(order.id)}
                        onMouseOut={() => setHoveredItemId('')}
                        onClick={() => deleteOrder(order.id)}/>
                </div>
            ))}
        </Container>
        </>
    )
}

export default Profile