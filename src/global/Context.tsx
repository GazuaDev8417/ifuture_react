import { 
    Dispatch, ReactNode, SetStateAction,
    createContext, useState
} from "react"
import { Products, Restaurant, User, Order } from "../types/types"
import axios from "axios"
import { BASE_URL } from "../constants/url"



export interface GlobalStateContext{
    menu:Restaurant
    setMenu:Dispatch<SetStateAction<Restaurant>>
    restaurantId:string
    setRestaurantId:Dispatch<SetStateAction<string>>
    //products:Products[]
    //setProducts:Dispatch<SetStateAction<Products[]>>
    /* orders:Order[]
    setOrders:Dispatch<SetStateAction<Order[]>> */
    user:User
    getProfile: () => void
    getAllOrders: (id:string) => void
    cart:Order[]
    setCart:Dispatch<SetStateAction<Order[]>>
    /* orderHistory: () => void
    showOrder:boolean
    setShowOrder:Dispatch<SetStateAction<boolean>>*/
}

type GlobalStateProps = {
    children:ReactNode
}


const Context = createContext<GlobalStateContext | null>(null)


export const GlobalState = (props:GlobalStateProps)=>{
    const [cart, setCart] = useState<Order[]>([])
    const [restaurantId, setRestaurantId] = useState<string>('')
    const [menu, setMenu] = useState<Restaurant>({
        address:'',
        category:'',
        deliveryTime:0,
        description:'',
        id:'',
        logoUrl:'',
        name:'',
        shipping:0
    })
    //const [products, setProducts] = useState<Products[]>()
    //const [showOrder, setShowOrder] = useState<boolean>(false)
    const [user, setUser] = useState<User>({
        id:'',
        username:'',
        cpf:'',
        email:'',
        street:'',
        number:0,
        neighbourhood:'',
        city:'',
        state:'',
        complement:''
    })
 


    const getAllOrders = (id:string)=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }
        axios.get(`${BASE_URL}/orders/${id}`, headers).then(res=>{
            setCart(res.data)
        }).catch(e => {
            e.response.data
            console.log(e.response.data)
        })
    }


    /* const orderHistory = ()=>{
        axios.get(`${BASE_URL}/orders/history`, {
            headers: { auth: localStorage.getItem('token') }
        }).then(res=>{
            setOrders(res.data.orders)
        }).catch(e=>{
            alert(e.response.data.message)
        })
    } */


    const getProfile = ()=>{
        axios.get(`${BASE_URL}/profile`, {
            headers: { Authorization: localStorage.getItem('token') || '' }
        }).then(res=>{
            setUser(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    


    return(
        <Context.Provider value={{ 
            menu, setMenu, getProfile, getAllOrders, cart, setCart,/*  orderHistory, */ user,
            /* orders, setOrders, */ setRestaurantId, restaurantId/* showOrder, setShowOrder */
        }}>
            { props.children }
        </Context.Provider>
    )
}

export default Context



