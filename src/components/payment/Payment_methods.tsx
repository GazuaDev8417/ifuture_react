import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

// eslint-disable-next-line react-refresh/only-export-components
const Container = styled.div`
    .image{
        width: 150px;
        height: 100px;
    }

    .money-container{
        display: flex;
        flex-wrap: wrap;
        /* align-items: center; */
        justify-content: center;
        gap: 5px;
    }

    .payment-box{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .payment-btn{
        padding: 5px;
        color: #fff;
    }

    .label{
        cursor: pointer;
    }
`
/* const QRCodeBox = styled.div`
    .qrcode-container{
        background-color: rgba(245, 245, 245, .7);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(.1);
        width: 500px;
        border: 2px solid;
        border-radius: 5px;
        box-shadow: 0 0 10px;
        padding: 10px 25px;
        opacity: 0;
        pointer-events: none;
        transition: 1s ease;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    .qrcode-container.active{
        opacity: 1;
        pointer-events: auto;
        transform: translate(-50%, -50%) scale(1);
    }
` */


interface PaymentProps{
    paymentMethod:string
    handleRadioButton: (e:ChangeEvent<HTMLInputElement>) => void
    selectedValue:string
    //showQRcode:boolean
    setShowQRcode:Dispatch<SetStateAction<boolean>>
    //total:number
    textPopup:boolean
    setTextPopup:Dispatch<SetStateAction<boolean>>
}


const Payment_methods = ({ 
    paymentMethod, handleRadioButton, selectedValue, textPopup, setTextPopup,/* total, showQRcode, */ setShowQRcode
 }:PaymentProps)=>{
    
    
    
    return(
        <Container>  
            {
                paymentMethod === 'money' ? (
                    <div className="money-container">
                        <div className="payment-box">
                            <label className='label' htmlFor="payPal">
                                <img src='https://logospng.org/wp-content/uploads/pix.png' 
                                    alt="Pix Image"
                                    className="image" 
                                    onClick={() => {
                                        setTextPopup(false)
                                        setShowQRcode(true)
                                    }}
                                    />
                            </label>
                            <input 
                                type="radio"
                                value='PayPal'
                                checked={selectedValue === 'PayPal' && textPopup}
                                name="payment"
                                id="payPal"
                                onChange={handleRadioButton} />
                        </div>
                        
                        {/* <div className="payment-box">
                            <label className='label' htmlFor="boleto">
                                <img src="https://olhardigital.com.br/wp-content/uploads/2015/02/20150205184012.jpg" 
                                    alt="Boleto Image"
                                    className="image" />
                            </label>
                            <input 
                                value='Boleto'
                                checked={selectedValue === 'Boleto'}
                                type="radio"
                                name="payment"
                                id="boleto"
                                onChange={handleRadioButton} />
                        </div> */}
                    </div>
                    ) : (
                    <div className="money-container">
                        <div className="payment-box">
                            <label className='label' htmlFor="visa">
                                <img 
                                    src="https://img.freepik.com/free-icon/visa_318-202971.jpg" 
                                    alt="Imagem de cartões de crédito"
                                    className="image" />
                            </label>
                            <input 
                                value='Visa'
                                checked={selectedValue === 'Visa'}
                                type="radio"
                                name="payment" 
                                id="visa"
                                onChange={handleRadioButton} />
                        </div>                            
                        <div className="payment-box">
                            <label className='label' htmlFor="master">
                                <img 
                                    src="https://imageio.forbes.com/blogs-images/steveolenski/files/2016/07/Mastercard_new_logo-1200x865.jpg?height=512&width=711&fit=bounds" 
                                    alt="Imagem de cartões de crédito"
                                    className="image" />
                            </label>
                            <input
                                value='Master Card'
                                checked={selectedValue === 'Master Card'} 
                                type="radio" 
                                name="payment" 
                                id="master"
                                onChange={handleRadioButton} />
                        </div>                            
                        <div className="payment-box">
                            <label className='label' htmlFor="hipercard">
                                <img 
                                    src="https://seeklogo.com/images/H/Hipercard_Novo-logo-05174E7224-seeklogo.com.png" 
                                    alt="Imagem de cartões de crédito"
                                    className="image" />
                            </label>
                            <input 
                                value='Hiper Card'
                                checked={selectedValue === 'Hiper Card'}
                                type="radio" 
                                name="payment" 
                                id="hipercard"
                                onChange={handleRadioButton} />
                        </div>                            
                        <div className="payment-box">
                            <label className='label' htmlFor="american">
                                <img 
                                    src="https://static.vecteezy.com/ti/vetor-gratis/t1/14414708-logotipo-da-american-express-em-fundo-transparente-gratis-vetor.jpg" 
                                    alt="Imagem de cartões de crédito"
                                    className="image" />
                            </label>
                            <input
                                value='American Express'
                                checked={selectedValue === 'American Express'} 
                                type="radio"
                                name="payment"
                                id="american"
                                onChange={handleRadioButton} />
                        </div>                            
                    </div>
                    )
            }
        </Container>
    )
}

export default Payment_methods