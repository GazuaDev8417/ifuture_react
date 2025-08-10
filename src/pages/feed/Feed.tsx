import { ChangeEvent, FC, useEffect, useState, useContext } from "react"
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



const Feed:FC = ()=>{
    const navigate = useNavigate()
    const { getRestaurantById } = useContext(Context) as GlobalStateContext
    const [word, setWord] = useState<string>('')
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [filteredByCategory, setFilteredByCategory] = useState<Restaurant[]>([])
    const [categorySelected, setCategorySelected] = useState<boolean>(false)
    const token = localStorage.getItem('token')
    



    const login = ()=>{
        axios.post(`${BASE_URL}/login`).then(res=>{
            localStorage.setItem('token', res.data)
        }).catch(e => alert(e.response.data))
    }
   
    useEffect(()=>{
        if(!token){
            login()
        }

        getRestaurants()
    }, [])
    

    const getRestaurants = ()=>{
        
        axios.get(`${BASE_URL}/restaurants`).then(res=>{
            setRestaurants(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const handleInput = (e:ChangeEvent<HTMLInputElement>):void=>{
        setWord(e.target.value)
    }

    
    const filteredSearch = restaurants && restaurants.filter(rest=>{
        return rest.name.toLocaleLowerCase().includes(word.toLocaleLowerCase())
    })

    const filteredByCategorySearch = filteredByCategory && filteredByCategory.filter(res=>{
        return res.name.toLocaleLowerCase().includes(word.toLocaleLowerCase())
    })
    
    const categoryFilter = (category:string)=>{
        const filtered = restaurants.filter(rest => rest.category === category)
        setFilteredByCategory(filtered)
        setCategorySelected(true)
    }

   
    


    return(
        <>
        <Header
            leftIcon={
                <AiOutlineShoppingCart className="header-icon" onClick={()=>{
                    navigate('/ifuture_react/cart')
                }}/>
            }
            rightIcon={
                <div/>
            }/>
        <Container>
            <div className="input-container">
                <input
                    placeholder="Digite o nome do restaurante" 
                    type="search"
                    onChange={handleInput}
                    className="input-search"/>
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
            {categorySelected ? (
                filteredByCategorySearch.length > 0 ? (
                    filteredByCategorySearch.map(item=>{
                        return(
                            <RestaurantCard key={item.id}
                                id={item.id}
                                logourl={item.logourl}
                                /* deliveryTime={item.deliveryTime}
                                shipping={item.shipping} */
                                getRestaurantById={()=>{
                                    localStorage.setItem('restaurantId', item.id)
                                    getRestaurantById(item.id)
                                    navigate('/ifuture_react/detail')
                                }}
                            />
                        )
                    })
                )  : (
                    word && <div className="no-results">Nenhum restaurante encontrado!</div>
                )
            ) : (
                filteredSearch.length > 0 ? filteredSearch.map(rest=>(
                    <RestaurantCard key={rest.id}
                        id={rest.id}
                        logourl={rest.logourl}
                        getRestaurantById={()=>{
                            localStorage.setItem('restaurantId', rest.id)
                            getRestaurantById(rest.id)
                            navigate('/ifuture_react/detail')
                        } }
                    />
                )) : (
                    word ? <div className="no-results">Nenhum restaurante encontrado!</div>
                    : <div className="loading"><Loading/></div>
                ) 
            )}
        </Container>
        </>
    )
}

export default Feed