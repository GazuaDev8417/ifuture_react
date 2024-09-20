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



const Detail:FC = ()=>{
    const navigate = useNavigate()
    const [qnt, setQnt] = useState<string[]>([])
    const { menu, cart, setCart, } = useContext(Context) as GlobalStateContext
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
    
    const handleSelect = (e:ChangeEvent<HTMLSelectElement>, index:number)=>{
        const newQnt = [...qnt]
        newQnt[index] = e.target.value
        setQnt(newQnt)
    }
    
    const addToCart = (item:Products, index:number)=>{
        const cartItem:CartItem = {
            id: item.id,
            name: item.name,
            image: item.photoUrl,
            description: item.description,
            quantity: Number(qnt[index] === undefined ? 1 : qnt[index]),
            price: item.price,
            total: (item.price) * Number(qnt),
            restaurantId: menu.id
        }
        
        const duplicatedItem = cart.find(cartItem => cartItem.id === item.id)

        if(duplicatedItem){
            const decide = window.confirm(`Você adicionou ${duplicatedItem.name}, basta ir ao carrinho e fanilizar a compra. Deseja ir ao carrinho?`)
            
            if(decide){
                navigate('/ifuture_react/cart')
            }

            return
        }

        const newCart = [...cart, cartItem]
        setCart(newCart)
    }

    
    return(
        <>
        <Header
            leftIcon={
                <AiOutlineShoppingCart className="header-icon" onClick={()=> navigate('/ifuture_react/cart')} />
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
                    {products && products.map((product, index)=>(
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
                                <select className="select" 
                                    value={qnt[index]} onChange={(e)=>handleSelect(e, index)}>
                                    <option defaultValue={1}>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                                <button 
                                    onClick={()=> addToCart(product, index)}>
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