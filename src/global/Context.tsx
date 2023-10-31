import { 
    Dispatch, ReactNode, SetStateAction,
    createContext, useState
} from "react"
import { CartItem, Products, RestaurantData, User, Order } from "../types/types"
import axios from "axios"
import { BASE_URL } from "../constants/url"



export interface GlobalStateContext{
    menu:RestaurantData
    setMenu:Dispatch<SetStateAction<RestaurantData>>
    product:Products
    setProduct:Dispatch<SetStateAction<Products>>
    cart:CartItem[]
    setCart:Dispatch<SetStateAction<CartItem[]>>
    orderHistory: () => void
    orders:Order[]
    setOrders:Dispatch<SetStateAction<Order[]>>
    user:User
    getProfile: () => void
    showOrder:boolean
    setShowOrder:Dispatch<SetStateAction<boolean>>
}

type GlobalStateProps = {
    children:ReactNode
}


const Context = createContext<GlobalStateContext | null>(null)


export const GlobalState = (props:GlobalStateProps)=>{
    const [cart, setCart] = useState<CartItem[]>([])
    const [orders, setOrders] = useState<Order[]>([])
    const [showOrder, setShowOrder] = useState<boolean>(false)
    const [user, setUser] = useState<User>({
        id:'',
        name:'',
        cpf:'',
        email:'',
        hasAddress: false,
        address:''
    })
    const [product, setProduct] = useState<Products>({
        category: '',
        description: '',
        id: '',
        name: '',
        photoUrl: '',
        price:0
    })
    const [menu, setMenu] = useState<RestaurantData>({
        address: '',
        category: '',
        deliveryTime:0,
        description: '',
        id: '',
        logoUrl: '',
        name: '',
        shipping:0,
        products:[{
            category: '',
            description: '',
            id: '',
            name: '',
            photoUrl: '',
            price:0
        }]
    })


    const orderHistory = ()=>{
        axios.get(`${BASE_URL}/orders/history`, {
            headers: { auth: localStorage.getItem('token') }
        }).then(res=>{
            setOrders(res.data.orders)
        }).catch(e=>{
            alert(e.response.data.message)
        })
    }


    const getProfile = ()=>{
        axios.get(`${BASE_URL}/profile`, {
            headers: { auth: localStorage.getItem('token') || '' }
        }).then(res=>{
            setUser(res.data.user)
        }).catch(e=>{
            alert(e.response.data.message)
        })
    }
    


    return(
        <Context.Provider value={{ 
            menu, setMenu, product, getProfile,
            setProduct, cart, setCart, orderHistory, user,
            orders, setOrders, showOrder, setShowOrder
        }}>
            { props.children }
        </Context.Provider>
    )
}

export default Context



