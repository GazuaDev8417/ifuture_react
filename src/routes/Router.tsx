import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import Signup from "../pages/signup/Signup"
import Login from "../pages/login/Login"
import Profile from "../pages/profile/Profile"
import Feed from "../pages/feed/Feed"
import Detail from "../pages/detail/Detail"
import Cart from "../pages/cart/Cart"
import Address from "../pages/address/Address"
import Address2 from "../pages/address/Address2"
import EditProfile from "../pages/editProfile/EditProfile"



const Router:FC = ()=>{
    return(
        <Routes>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/ifuture_react" element={<Login/>} />
            <Route path="/feed" element={<Feed/>} />
            <Route path="/detail" element={<Detail/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/address" element={<Address/>} />
            <Route path="/update-address" element={<Address2/>} />
            <Route path="/edit-profile" element={<EditProfile/>} />
        </Routes>
    )
}

export default Router