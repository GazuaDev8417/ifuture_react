import { 
    Dispatch, ReactNode, SetStateAction,
    createContext, useState
} from "react"
import { Restaurant, Products, User, Order } from "../types/types"
import axios from "axios"
import { BASE_URL } from "../constants/url"



export interface GlobalStateContext{
    getRestaurantById: (id:string) => void
    menu:Restaurant
    //setMenu:Dispatch<SetStateAction<Restaurant>>
    products:Products[]
    setProducts:Dispatch<SetStateAction<Products[]>>
    getProfile: () => void
    user:User
    getAllOrders: () => void
    cart:Order[]
    setCart:Dispatch<SetStateAction<Order[]>>
    updateAddress:boolean
    setUpdateAddress:Dispatch<SetStateAction<boolean>>
    registAddress:boolean
    setRegistAddress:Dispatch<SetStateAction<boolean>>
    allFieldsFilled:boolean
    setAllfieldsFilled:Dispatch<SetStateAction<boolean>>
}

type GlobalStateProps = {
    children:ReactNode
}


const Context = createContext<GlobalStateContext | null>(null)


export const GlobalState = (props:GlobalStateProps)=>{
    const [cart, setCart] = useState<Order[]>([])
    const [updateAddress, setUpdateAddress] = useState<boolean>(false)
    const [registAddress, setRegistAddress] = useState<boolean>(false)
    const [allFieldsFilled, setAllfieldsFilled] = useState<boolean>(false)
    const [products, setProducts] = useState<Products[]>([])
    const [menu, setMenu] = useState<Restaurant>({
        address:'',
        category:'',
        deliveryTime:0,
        description:'',
        id:'',
        logourl:'',
        name:'',
        shipping:0
    })
    const [user, setUser] = useState<User>({
        id:'',
        username:'',
        email:'',
        street:'',
        number:'',
        neighbourhood:'',
        city:'',
        state:'',
        complement:'',
        phone:'',
        cep:''
    })


    const getRestaurantById = (id:string)=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.get(`${BASE_URL}/restaurants/${id}`, headers).then(res=>{
            setMenu(res.data)
            axios.get(`${BASE_URL}/restaurant_products/${id}`, headers).then(res=>{
                setProducts(res.data)
            }).catch(e=>{
                alert(e.response.data)
            })
        }).catch(e=>{
            alert(e.response.data)
        })
    }
 


    const getAllOrders = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }
        axios.get(`${BASE_URL}/orders`, headers).then(res=>{
            setCart(res.data)
        }).catch(e => alert(e.response.data))
    }


    const getProfile = ()=>{
        axios.get(`${BASE_URL}/profile`, {
            headers: { Authorization: localStorage.getItem('token') || '' }
        }).then(res=>{
            setUser(res.data)
        }).catch(e => alert(e.response.data))
    }
    


    return(
        <Context.Provider value={{ 
            menu, products, setProducts, getProfile, getAllOrders, cart, setCart, user,
            getRestaurantById, updateAddress, setUpdateAddress, registAddress, setRegistAddress,
            allFieldsFilled, setAllfieldsFilled
        }}>
            { props.children }
        </Context.Provider>
    )
}

export default Context



