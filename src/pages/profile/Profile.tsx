import { useContext, useEffect } from 'react'
import Context, { GlobalStateContext } from '../../global/Context'
import { useNavigate } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'
import { AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai'
import Header from "../../components/Header"
import { Container } from './styled'



const Profile = ()=>{
    const navigate = useNavigate()
    const { 
        user, getProfile, orderHistory, orders
     } = useContext(Context) as GlobalStateContext

    

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
                <div>{user.name} <br />
                    {user.email} <br />
                    {maskedCPF(String(user.cpf))}
                </div>
                <MdEdit className="icon" onClick={()=> navigate('/ifuture_react/edit-profile')} />
            </div>
            <div className="address-section">
                <div>Endereço cadastrado: <br />
                    {user.address}
                </div>
                <MdEdit className="icon" onClick={()=> navigate('/ifuture_react/update-address')}/>
            </div>
            <div className="addressAndName">
                <div className="rest-name"></div>
                <div></div>
            </div>
            <div id='history' className="order-history">Histórico de pedidos</div>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            {orders && orders.map(order=>(
                <div className="card" key={order.restaurantName}>
                    <div className="rest-name">{order.restaurantName}</div>
                    Pedido feito em: {new Date(order.createdAt).toLocaleDateString()} <br />
                    Total: R$ {order.totalPrice.toFixed(2)}
                </div>
            ))}
        </Container>
        </>
    )
}

export default Profile