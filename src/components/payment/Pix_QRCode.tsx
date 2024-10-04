import { QRCodeSVG } from "qrcode.react"
import { FC } from "react"

interface PhoneQRCodeProps{
    phoneNumber:string
}

const PhoneQRCode:FC<PhoneQRCodeProps> = ({ phoneNumber })=>{
    return(
        <QRCodeSVG value={`tel:${phoneNumber}`} size={250}/>
    )
}


export default PhoneQRCode