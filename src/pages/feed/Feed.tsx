import { ChangeEvent, FC, useEffect, useState, useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Context, { GlobalStateContext } from "../../global/Context"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import axios from 'axios'
import { BASE_URL } from "../../constants/url"
import RestaurantCard from "../../components/RestaurantCard"
import Header from "../../components/Header"
import { Restaurant } from "../../types/types"
import { Container } from "./styled"
import { Loading } from "../../components/Loading"
import { restaurantImages } from '../../constants/index'
import Logo from '/imgs/logo-future-eats-invert.png'
import hideImage from "../../utils/hideImage"






const Feed:FC = ()=>{
    const navigate = useNavigate()
    const imageRef = useRef<HTMLImageElement>(null)
    const { getRestaurantById } = useContext(Context) as GlobalStateContext
    const [word, setWord] = useState<string>('')
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    //const [category, setCategory] = useState<string | null>(null)
    


    useEffect(()=>{
        getRestaurants()
    }, [])


    useEffect(()=>{
        const onScroll = () => hideImage(imageRef)

        window.addEventListener('scroll', onScroll)
        
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    

    const getRestaurants = ()=>{        
        axios.get(`${BASE_URL}/restaurants`).then(res=>{
            setRestaurants(res.data)
        }).catch(e=>{
            alert(e.response?.data)
        })
    }


    const handleInput = (e:ChangeEvent<HTMLInputElement>):void=>{
        setWord(e.target.value)
    }

    
    const filteredRestaurants = restaurants
        /* .filter(rest => !category || rest.category === category) */
        .filter(rest => rest.name.toLocaleLowerCase().includes(word.toLocaleLowerCase()))
    

    
    


    return(
        <>
        <Header
            leftIcon={
                <AiOutlineShoppingCart className="header-icon" onClick={()=>{
                    navigate('/ifuture_react/cart')
                }}/>
            }
            center={<img src={Logo} alt="Logo" ref={imageRef} onClick={() => navigate('/ifuture_react')} />}
            rightIcon={
                <div/>
            }
        />
        <Container>
            <div className="input-container">
                <input
                    placeholder="Digite o nome do restaurante" 
                    type="search"
                    onChange={handleInput}
                    className="input-search"/>
            </div>
            {/* <div className="categories">
                {restaurants &&
                    [...new Set(restaurants.map(rest => rest.category))].map(category => (
                        <div className="card-category" key={category}
                            onClick={() => setCategory(category)}>
                                {category}
                            </div>
                    ))
                }
            </div> */}
            {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map(rest=>(
                    <RestaurantCard key={rest.id}
                        id={rest.id}
                        logourl={restaurantImages[rest.name]}
                        getRestaurantById={()=>{
                            localStorage.setItem('restaurantId', rest.id)
                            getRestaurantById(rest.id)
                            navigate('/ifuture_react/detail')}}/>
                        ))
                ) : word ? (
                    <div className="no-results">Nenhum restaurante encontrado!</div>
                ) : (
                    <div className="loading"><Loading/></div>
            )}
        </Container>
        </>
    )
}

export default Feed