import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import Signup from "../pages/signup/Signup"
import Login from "../pages/login/Login"
import Profile from "../pages/profile/Profile"
import Feed from "../pages/feed/Feed"
import Detail from "../pages/detail/Detail"
import Cart from "../pages/cart/Cart"
import Address from "../pages/address/Address"
//import Address2 from "../pages/address/Address2"
import EditProfile from "../pages/editProfile/EditProfile"



const Router:FC = ()=>{
    return(
        <Routes>
            <Route path="/ifuture_react/signup" element={<Signup/>} />
            <Route path="/ifuture_react" element={<Login/>} />
            <Route path="/ifuture_react/feed" element={<Feed/>} />
            <Route path="/ifuture_react/detail/:orderId" element={<Detail/>} />
            <Route path="/ifuture_react/cart" element={<Cart/>} />
            <Route path="/ifuture_react/profile" element={<Profile/>} />
            <Route path="/ifuture_react/address" element={<Address/>} />
            {/* <Route path="/ifuture_react/update-address" element={<Address2/>} /> */}
            <Route path="/ifuture_react/edit-profile" element={<EditProfile/>} />
        </Routes>
    )
}

export default Router