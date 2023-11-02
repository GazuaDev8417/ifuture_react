import { ChangeEvent } from 'react'
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


interface PaymentProps{
    paymentMethod:string
    handleRadioButton: (e:ChangeEvent<HTMLInputElement>) => void
    selectedValue:string
}


const Payment_methods = ({ paymentMethod, handleRadioButton, selectedValue }:PaymentProps)=>{
    

    return(
        <Container>  
            {
                paymentMethod === 'money' ? (
                    <div className="money-container">
                        <div className="payment-box">
                            <label htmlFor="payPal">
                                <img src="https://d2r9epyceweg5n.cloudfront.net/apps/2362-pt_BR-small-PP_logo_6_01.jpg" 
                                    alt="PayPal Image"
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
                            <label htmlFor="mPago">
                                <img src="https://ps.w.org/woocommerce-mercadopago/assets/icon-256x256.png?rev=2653727" 
                                    alt="Mercado Pago Image"
                                    className="image" />
                            </label>
                            <input
                                value='Mercado Pago'
                                checked={selectedValue === 'Mercado Pago'} 
                                type="radio"
                                name="payment"
                                id="mPago"
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
    )
}

export default Payment_methods