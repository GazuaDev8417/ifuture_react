import { ChangeEvent, FC, useEffect, useState, useRef, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Context, { GlobalStateContext } from "../../global/Context"
import axios from 'axios'
import { BASE_URL } from "../../constants/url"
import RestaurantCard from "../../components/RestaurantCard"
import Header from "../../components/Header"
import { BsFillPersonFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { Restaurant } from "../../types/types"
import { Container } from "./styled"
import { Loading } from "../../components/Loading"



const Feed:FC = ()=>{
    const navigate = useNavigate()
    const { setMenu } = useContext(Context) as GlobalStateContext
    const card = useRef<HTMLDivElement | null>(null)
    const [word, setWord] = useState<string>('')
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [filteredByCategory, setFilteredByCategory] = useState<Restaurant[]>([])


   
    useEffect(()=>{
        getRestaurants()

        if(!localStorage.getItem('token')){
            navigate('/ifuture_react')
        }
    }, [])
    

    const getRestaurants = ()=>{
        axios.get(`${BASE_URL}/restaurants`).then(res=>{
            setRestaurants(res.data)
        }).catch(e=>{
            alert(e.response.data.message)
        })
    }

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


    const handleInput = (e:ChangeEvent<HTMLInputElement>):void=>{
        setWord(e.target.value)
    }

    const filteredSearch = restaurants && restaurants.filter(rest=>{
        return rest.name.toLocaleLowerCase().includes(word.toLocaleLowerCase())
    })


    const categoryFilter = (category:string)=>{
        const filtered = restaurants.filter(rest => rest.category === category)
        setFilteredByCategory(filtered)

        if(card.current){
            if(filteredByCategory.length === 0){            
                card.current.style.display = 'block'
            }else{
                card.current.style.display = 'none'                
            }
        }
    }
   
    


    return(
        <>
        <Header
            leftIcon={
                <AiFillHome className="header-icon" onClick={()=> navigate('/ifuture_react/feed')} />
            }
            rightIcon={
                <BsFillPersonFill className="header-icon" onClick={()=> navigate('/ifuture_react/profile')} />
            }/>
        <Container>
            <div className="input-container">
                <input
                    placeholder="Digite o nome do restaurante" 
                    type="search"
                    onChange={handleInput}/>
            </div>
            <div className="categories">
                {restaurants &&
                    [...new Set(restaurants.map(rest => rest.category))].map(category => (
                        <div className="card-category" key={category}
                            onClick={() => categoryFilter(category)}>
                                {category}
                            </div>
                    ))
                }
            </div>
            {filteredByCategory && filteredByCategory.map(item=>{
                return(
                    <RestaurantCard key={item.id}
                        id={item.id}
                        logoUrl={item.logoUrl}
                        name={item.name}
                        deliveryTime={item.deliveryTime}
                        shipping={item.shipping}
                        getRestaurantById={()=> getRestaurantById(item.id)}
                    />
                )
            })}
            <div id="restaurants" ref={card}>
                {filteredSearch.length > 0 ? filteredSearch.map(rest=>(
                    <RestaurantCard key={rest.id}
                        id={rest.id}
                        logoUrl={rest.logoUrl}
                        name={rest.name}
                        deliveryTime={rest.deliveryTime}
                        shipping={rest.shipping}
                        getRestaurantById={()=> getRestaurantById(rest.id)}
                    />
                )) : <div className="loading"><Loading/></div> }
            </div>
        </Container>
        </>
    )
}

export default Feed