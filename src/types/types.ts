export interface Restaurant{
    address:string
    category:string
    deliveryTime:number
    description:string
    id:string
    logoUrl:string
    name:string
    shipping:number
}

export interface Products{
    category:string
    description:string
    id:string
    name:string
    photoUrl:string
    price:number
}

export interface RestaurantData{
    address:string
    category:string
    deliveryTime:number
    description:string
    id:string
    logoUrl:string
    name:string
    shipping:number
    products:Products[]
}

export interface CartItem{
    id:string
    image:string
    name:string
    description:string
    quantity:number
    price:number
    total:number
    restaurantId:string
}

export interface User{
    id:string
    name:string
    cpf:string
    email:string
    hasAddress:boolean
    address:string
}

export interface Order{
    createdAt:number
    expiresAt:number
    restaurantName:string
    totalPrice:number
}