import { RefObject } from "react"




const hideImage = (imageRef:RefObject<HTMLImageElement | null>)=>{

    if(imageRef.current && window.scrollY > 0){
        imageRef.current.style.display = 'none'
    }else if(imageRef.current && window.scrollY < 100){
        imageRef.current.style.display = 'block'
    }
}




export default hideImage