import { ChangeEvent, FC, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Context, { GlobalStateContext } from "../../global/Context"
import Header from "../../components/Header"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { CartItem, Products } from "../../types/types"
import { Container } from './styled'
import axios from "axios"
import { BASE_URL } from "../../constants/url"


interface Qnt{
    id:string
}


const Detail:FC = ()=>{
    const navigate = useNavigate()
    const { menu, setRestaurantId, getAllOrders } = useContext(Context) as GlobalStateContext
    const [products, setProducts] = useState<Products[]>([])



    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(!token){
            navigate('/ifuture_react')
        }

        getProducts()
    }, [])


    const getProducts = ()=>{
        axios.get(`${BASE_URL}/restaurant_products/${menu.id}`).then(res=>{
            setProducts(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    /* const handleChange = (productId:string, value:number)=>{
        setQnt({[productId]:value})
        setRequestQnt(qnt[productId])
        console.log(qnt)
        console.log(qnt[productId])
    } */
    
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
            setRestaurantId(product.provider)
        }).catch(e=>{
            const decide = confirm(e.response.data)
            if(decide){
                navigate('/ifuture_react/cart')
                setRestaurantId(product.provider)
            }
        })
    }

    
    return(
        <>
        <Header
            leftIcon={
                <AiOutlineShoppingCart className="header-icon" onClick={()=>{
                    getAllOrders(menu.id)
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
                    src={menu.logoUrl}
                    alt="Imagem do restaurante"
                    className="image"/>                
                <div className="desc">
                    <div className="rest-name">{menu.category}</div>
                    <p>{menu.description}</p>
                    <div className="time">
                        <span>Frete: R$ {menu.shipping.toFixed(2)}</span>
                        <span>{menu.deliveryTime} - {menu.deliveryTime + 10} min</span>
                    </div>
                    <p>{menu.address}</p>
                </div>
                <div className="products">Cardápio Principal</div>
                <div className="products-container">
                    {products && products.map(product=>(
                        <div className="products-card" key={product.id}>
                            <img
                                className="product-image" 
                                src={product.photoUrl}
                                alt="Foto do produto" />
                            <div>
                                <h4>{product.name}</h4><br/>
                                {product.description}<br/><br/>
                                <div>R$ {product.price.toFixed(2)}</div>
                            </div>
                            <div className="select-btn-container">
                                {/* <input 
                                    type="number"
                                    value={qnt[product.id] || 0}
                                    onChange={e => handleChange(product.id, Number(e.target.value))} 
                                    min={0} /> */}
                                {/* <button 
                                    onClick={()=> addToCart(product)}>
                                    Adicionar
                                </button> */}
                                <button 
                                    onClick={()=> request(product)}>
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
        </>
    )
}

export default Detail