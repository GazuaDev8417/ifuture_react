import { FC, useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Context, { GlobalStateContext } from "../../global/Context"
import Header from "../../components/Header"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { Products } from "../../types/types"
import { Container, Temp } from './styled'
import axios from "axios"
import { BASE_URL } from "../../constants/url"




const Detail:FC = ()=>{
    const navigate = useNavigate()
    const selectedOrderId = localStorage.getItem('selectedOrderId')
    const ordersRef = useRef<{ [key:string]: HTMLElement | null }>({})
    const { menu, getAllOrders, getRestaurantById, products } = useContext(Context) as GlobalStateContext
    /* const [products, setProducts] = useState<Products[]>([]) */



    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(!token){
            navigate('/ifuture_react')
        }

        const restaurantId = localStorage.getItem('restaurantId')
        if(restaurantId){
            getRestaurantById(restaurantId)            
        }
    }, [])


    useEffect(()=>{
        if(selectedOrderId && ordersRef.current[selectedOrderId]){
            setTimeout(() => {
                ordersRef.current[selectedOrderId]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                })
            }, 100)
        }
    }, [selectedOrderId])
    
    
    const request = (product: Products)=>{
        const now = new Date()
        const headers = {
            headers: { Authorization: localStorage.getItem('token')}
        }
        const body = {
            product: product.name, 
            price: product.price,
            photoUrl: product.photoUrl,
            quantity: 1,
            total: product.price,
            moment: `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`, 
            restaurant: product.provider
        }
        
        axios.post(`${BASE_URL}/order`, body, headers).then(res=>{
            alert(res.data)
            getAllOrders()
        }).catch(e=>{
            const decide = confirm(e.response.data)
            if(decide){
                navigate('/ifuture_react/cart')
            }
        })
    }

    
    return(
        <Temp>
        <Header
            leftIcon={
                <AiOutlineShoppingCart className="header-icon" onClick={()=>{
                    getAllOrders()
                    navigate('/ifuture_react/cart')
                }} />
            }
            rightIcon={
                <BsFillPersonFill className="header-icon" onClick={()=> navigate('/ifuture_react/profile')} />
            }/>
        <Container>
            <h1>{menu.name}</h1>
            <div className="card">
                <img 
                    src={menu.logourl}
                    alt="Imagem do restaurante"
                    className="image"/>                
                <div className="desc">
                    <div className="rest-name">{menu.category}</div>
                    <p>{menu.description}</p>
                    {/* <div className="time">
                        <span>Frete: R$ {menu.shipping.toFixed(2)}</span>
                        <span>{menu.deliveryTime} - {menu.deliveryTime + 10} min</span>
                    </div> */}
                    <p>{menu.address}</p>
                </div>
                <div className="products">Cardápio Principal</div>
                <div className="products-container">
                    {products && products.map(product=>(
                        <div 
                            className="products-card"
                            key={product.id}
                            ref={el => ordersRef.current[product.id] = el}
                            >
                            <img
                                className="product-image" 
                                src={product.photoUrl}
                                alt="Foto do produto" />
                            <div className="product-desc">
                                <h4>{product.name}</h4><br/>
                                {product.description}<br/><br/>
                                <div>R$ {product.price.toFixed(2)}</div>
                            </div>
                                <button 
                                    onClick={()=> request(product)}>
                                    Pedir
                                </button>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
        </Temp>
    )
}

export default Detail