import { FC, useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Context, { GlobalStateContext } from "../../global/Context"
import Header from "../../components/Header"
import { BsFillPersonFill } from 'react-icons/bs'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Products } from "../../types/types"
import { Container } from './styled'
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { useLoadScript, Libraries } from "@react-google-maps/api"
import { isMobileApp } from "../../utils/isMobileApp"



type Places = google.maps.places.PlaceResult
const libraries:Libraries = ['places']


const Detail:FC = ()=>{
    const navigate = useNavigate()
    const selectedOrderId = localStorage.getItem('selectedOrderId')
    const ordersRef = useRef<{ [key:string]: HTMLElement | null }>({})
    const { menu, getAllOrders, getRestaurantById, products } = useContext(Context) as GlobalStateContext
    const [places, setPlaces] = useState<Places[]>([])
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDRDtZy_CrM0csM_Y51FU01-tiW4F2SapU',
        libraries
    })



    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        if(isMobileApp()){
            alert('É necessário abrir pelo navegador para ver os estabelecimentos nas suas proximidades.S')
        }
        
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
    
    
    useEffect(()=>{
        if(!isLoaded) return

        navigator.geolocation.getCurrentPosition(position=>{
            const { latitude, longitude } = position.coords
            const service = new window.google.maps.places.PlacesService(
                document.createElement('div')
            )

            const request = {
                location: new window.google.maps.LatLng(latitude, longitude),
                radius: 5000,
                keyword: menu.name
            }

            service.nearbySearch(request, (results, status)=>{
                if(status === window.google.maps.places.PlacesServiceStatus.OK && results){
                    const filteredResults = results.filter(place =>(
                        place.name?.toLocaleLowerCase().includes(menu.name.toLocaleLowerCase())
                    ))
                    setPlaces(filteredResults)
                }else{
                    console.error(`Falha no PlaceServices: ${status}`)
                }
            })
        })
    }, [isLoaded, menu.name])



    
    const request = (product: Products)=>{
        const now = new Date().toISOString()
        const headers = {
            headers: { Authorization: localStorage.getItem('token')}
        }
        const body = {
            product: product.name, 
            price: product.price,
            photoUrl: product.photoUrl,
            quantity: 1,
            total: product.price,
            momentString: now, 
            restaurant: product.provider,
            description: product.description
        }
        
        axios.post(`${BASE_URL}/order`, body, headers).then(res=>{
            getAllOrders()
            const decide = confirm(res.data)
            if(decide){
                navigate('/ifuture_react/cart')
            }
        }).catch(e=>{
            const decide = confirm(e.response.data)
            if(decide){
                navigate('/ifuture_react/cart')
            }
        })
    }

    
    return(
        <>
        <Header
            leftIcon={
                <AiOutlineShoppingCart className="header-icon" onClick={()=>{
                    getAllOrders()
                    navigate('/ifuture_react/cart')
                }} />
            }
            rightIcon={
                <div/>
            }/>
        <Container>
            <div className="card">
                <div className="rest-name">{menu.category}</div>
                <img 
                    src={menu.logourl}
                    alt="Imagem do restaurante"
                    className="image"/>                
                <div className="desc">
                    <p>{menu.description}</p>
                    <h3 style={{textAlign:'center', marginTop:'20px', marginBottom:'10px'}}>
                        {menu.name} perto de você
                    </h3>
                    <div>
                        {places.length > 0 ? (
                            places.map(place=>(
                                <div key={place.place_id} style={{marginBottom:'10px'}}>
                                    {place.name}<br/>
                                    {place.vicinity}
                                </div>
                            ))
                        ) : <div>Não há {menu.name} em suas proximidades</div> }
                    </div>
                    <p>{menu.address}</p>
                </div>
                <div className="products">Cardápio Principal</div>
                <div className="products-container">
                    {products && products.map(product=>(
                        <div 
                            className="products-card"
                            key={product.id}
                            ref={el =>{
                                ordersRef.current[product.id] = el
                            }}>
                            <img
                                className="product-image" 
                                src={product.photoUrl}
                                alt="Foto do produto" />
                            <div className="product-desc">
                                <h4>{product.name}</h4><br/>
                                {product.description}<br/><br/>
                                <div>R$ {Number(product.price).toFixed(2)}</div>
                            </div>
                                <button 
                                    className="request-button"
                                    onClick={()=> request(product)}>
                                    Pedir
                                </button>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
        </>
    )
}

export default Detail