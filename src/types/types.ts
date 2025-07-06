export interface Restaurant{
    address:string
    category:string
    deliveryTime:number
    description:string
    id:string
    logourl:string
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
    provider:string
}

export interface User{
    id:string
    username:string
    email:string
    street:string,
    number:string
    neighbourhood:string
    city:string
    state:string
    complement:string
    phone:string
    cep:string
}

export interface Order{
    id:string
    product:string 
    price:number
    photoUrl:string
    quantity:number
    total:number
    moment:string
    restaurant:string 
    client:string
}