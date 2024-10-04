import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { QRCodeSVG } from 'qrcode.react'
import { handleKeydown } from '../../utils/escape_key'

// eslint-disable-next-line react-refresh/only-export-components
const Container = styled.div`
    .image{
        width: 150px;
        height: 100px;
    }

    .money-container{
        display: flex;
        flex-wrap: wrap;
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
`
const QRCodeBox = styled.div`
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
`


interface PaymentProps{
    paymentMethod:string
    handleRadioButton: (e:ChangeEvent<HTMLInputElement>) => void
    selectedValue:string
    showQRcode:boolean
    setShowQRcode:Dispatch<SetStateAction<boolean>>
    total:number
}


const Payment_methods = ({ 
    paymentMethod, handleRadioButton, selectedValue, total, showQRcode, setShowQRcode
 }:PaymentProps)=>{
    const [textPopup ,setTextPopup] = useState<boolean>(false)



    const handleCopy = (textToCopy:string)=>{
        navigator.clipboard.writeText(textToCopy).then(()=>{
            setTextPopup(true)
            setShowQRcode(true)
            setTimeout(()=>{
                setShowQRcode(false)
                setTextPopup(false)
            }, 1000)
        }).catch(e=>{
            console.log(`Erro ao copiar: ${e}`)
        })
    }
    console.log(showQRcode)
    
    return(
        <>
        <Container className={`${selectedValue === 'PayPal' ? 'blur' : ''}`}>  
            {
                paymentMethod === 'money' ? (
                    <div className="money-container">
                        <div className="payment-box">
                            <label htmlFor="payPal">
                                <img src='https://logospng.org/wp-content/uploads/pix.png' 
                                    alt="Pix Image"
                                    className="image" />
                            </label>
                            <input 
                                type="radio"
                                value='PayPal'
                                checked={selectedValue === 'PayPal'}
                                name="payment"
                                id="payPal"
                                onChange={handleRadioButton} />
                        </div>
                        
                        <div className="payment-box">
                            <label htmlFor="boleto">
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
                        </div>
                    </div>
                    ) : (
                    <div className="money-container">
                        <div className="payment-box">
                            <label htmlFor="visa">
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
                            <label htmlFor="master">
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
                            <label htmlFor="hipercard">
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
                            <label htmlFor="american">
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
        <QRCodeBox>
            <div className={`qrcode-container ${showQRcode ? 'active' : ''}`}>
                <small style={{background:'white'}}>
                    Lembrando que o projeto se trata de uma simulação, este QRCode representa nada mais
                    que o valor total dos pedidos, não copiando nenhuma chave ou código de barras.
                </small>
                <QRCodeSVG value={String(total)} size={250} />
                {textPopup && <span className="textPopup">Copiado!</span>}
                <button style={{padding:10}} onClick={() => handleCopy(String(total.toFixed(2)))}>Copiar</button>
            </div>
        </QRCodeBox>
        </>
    )
}

export default Payment_methods