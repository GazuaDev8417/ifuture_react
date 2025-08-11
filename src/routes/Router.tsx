import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import Feed from "../pages/feed/Feed"
import Detail from "../pages/detail/Detail"
import Cart from "../pages/cart/Cart"
import Address from "../pages/address/Address"



const Router:FC = ()=>{
    return(
        <Routes>
            <Route path="/ifuture_react/" element={<Feed/>} />
            <Route path="/ifuture_react/detail" element={<Detail/>} />
            <Route path="/ifuture_react/cart" element={<Cart/>} />
            <Route path="/ifuture_react/address" element={<Address/>} />
        </Routes>
    )
}

export default Router