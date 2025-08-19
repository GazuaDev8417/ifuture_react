import { FC, useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Context, { GlobalStateContext } from "../../global/Context"
import Header from "../../components/Header"
import { IoMenu } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io"
import { Products, Restaurant } from "../../types/types"
import { Container, Overlay, Sidebar } from './styled'
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { useLoadScript, Libraries } from "@react-google-maps/api"
import { productsImages } from '../../constants/index'






type Places = google.maps.places.PlaceResult
const libraries:Libraries = ['places']


const Detail:FC = ()=>{
    const navigate = useNavigate()
    const { menu, getAllOrders, getRestaurantById, products } = useContext(Context) as GlobalStateContext
    const selectedOrderId = localStorage.getItem('selectedOrderId')
    const restaurantId = localStorage.getItem('restaurantId')
    const token = localStorage.getItem('token')
    const ordersRef = useRef<{ [key:string]: HTMLElement | null }>({})
    const [places, setPlaces] = useState<Places[]>([])
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [isActive, setIsActive] = useState<boolean>(false)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY as string,
        libraries
    })
    


    useEffect(()=>{
        if(restaurantId){
            getRestaurantById(restaurantId)            
        }
    }, [restaurantId, navigate])


    useEffect(()=>{
        if(selectedOrderId && ordersRef.current[selectedOrderId]){
            const timeout =  setTimeout(() => {
                ordersRef.current[selectedOrderId]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                })
            }, 100)

            return () => clearTimeout(timeout)
        }
    }, [selectedOrderId])
    
    
    useEffect(()=>{
        if(!isLoaded || !menu?.name) return

        let isCancelled = false

        navigator.geolocation.getCurrentPosition(position=>{
            if(isCancelled) return
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
                if(isCancelled) return
                if(status === window.google.maps.places.PlacesServiceStatus.OK && results){
                    const filteredResults = results.filter(place =>(
                        place.name?.toLocaleLowerCase().includes(menu.name.toLocaleLowerCase())
                    ))
                    setPlaces(filteredResults)
                }else{
                    console.error(`Falha no PlaceServices: ${status}`)
                }
            })
        },
        (error) =>{
            console.error('Erro ao obter localização', error)
        }
    )
    return () =>{
        isCancelled = true
    }
    }, [isLoaded, menu?.name])


    useEffect(()=> getRestaurants(), [])


    const getRestaurants = ()=>{        
        axios.get(`${BASE_URL}/restaurants`).then(res=>{
            setRestaurants(res.data)
        }).catch(e=>{
            alert(e.response?.data)
        })
    }


    
    const request = (product: Products)=>{
        if(!token){
            const decide = window.confirm('Necessário efetuar login para fazer pedidos')
            if(decide){
                navigate('/ifuture_react/login')
            }
            return
        }
        
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
            const message = e.response?.data || 'Erro ao enviar pedido. Tente novamente.'
            const decide = confirm(message)
            if(decide){
                navigate('/ifuture_react/cart')
            }
        })
    }


    const  formatName = (name:string)=>{
        return name
            .replace(/sua/, 'Sua ')
            .trim()
            .replace(/\b\w/g, c => c.toLocaleUpperCase())
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
                <IoMenu className="header-icon" onClick={()=>{
                    setIsActive(true)
                }}/>
            }/>
        <Container>
            <Overlay className={isActive ? 'active' : ''} onClick={() => setIsActive(false)}/>
            <Sidebar className={isActive ? 'active' : ''}>
                <h3>Restaurantes</h3>
                <ul>{restaurants.map(rest=>(
                        <li key={rest.id} onClick={()=>{
                            localStorage.setItem('restaurantId', rest.id)
                            setIsActive(false)
                        }}>
                            {formatName(rest.name)}
                        </li>
                    ))}
                    <li onClick={() => navigate('/ifuture_react/cart')}>
                        Carrinho
                    </li>
                </ul>
            </Sidebar>
            <div className="card">
                <div className="rest-name">{menu.category}</div>
                <img 
                    src={`imgs/restaurants/${menu.logourl}`}
                    alt="Imagem do restaurante"
                    className="image"/>               
                <div className="desc">
                    <p>
                        {menu.description}
                    </p>
                    <h3 style={{textAlign:'center', marginTop:'20px', marginBottom:'10px'}}>
                        {formatName(menu.name)} perto de você
                    </h3>
                    <div>
                        {places.length > 0 ? (
                            places.map(place=>(
                                <div key={place.place_id} style={{marginBottom:'10px'}}>
                                    {place.name}<br/>
                                    {place.vicinity}
                                </div>
                            ))
                        ) : <div>Não há {formatName(menu.name)} em suas proximidades</div> }
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
                                src={productsImages[product.photoUrl]}
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