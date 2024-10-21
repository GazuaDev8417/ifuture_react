import { ChangeEvent, Dispatch, SetStateAction, useState, useContext } from 'react'
import Context, { GlobalStateContext } from  '../../global/Context'
import Cards from 'react-credit-cards'
import styled from 'styled-components'
import 'react-credit-cards/es/styles-compiled.css'
import { inputDate } from '../../utils/cpf_mask'


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

    .credit-container{
        background-color: rgba(0, 0, 255, .5);
        border-radius: 10px;
        padding: 7px;
        display: flex;  
        flex-wrap: wrap;
        gap: 30px;

        .form{
            display: flex;
            flex-direction: column;
            gap: 5px;

            input{
                background: transparent;
                border: none;
                border-bottom: 1px gray solid;
                border-radius: 0%;
                color: whitesmoke;
            }

            input::placeholder{
                color: lightblue;
            }

            .card-number{
                width: 300px;
            }

            .thirdLine-container{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .card-expiry{
                width: 100px;
            }

            .card-cvc{
                width: 70px;
            }
            
        }

        .button-container{
            margin-top: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            button{
                padding: 5px;
                background-color: rgba(0, 0, 255, .5);
                color: whitesmoke;
                &:hover{
                    background-color: rgba(0, 0, 255, .7);
                }
            }
        }
    }
`


interface PaymentProps{
    paymentMethod:string
    handleRadioButton: (e:ChangeEvent<HTMLInputElement>) => void
    selectedValue:string
    setShowQRcode:Dispatch<SetStateAction<boolean>>
    textPopup:boolean
    setTextPopup:Dispatch<SetStateAction<boolean>>
    cartLength:boolean
}

interface Form{
    number:string 
    name:string
    expiry:string
    cvc:string
}


const Payment_methods = ({ 
    paymentMethod, handleRadioButton, selectedValue, textPopup, setTextPopup, setShowQRcode, cartLength
 }:PaymentProps)=>{
    const { setAllfieldsFilled } = useContext(Context) as GlobalStateContext
    const [focused, setFocused] = useState<'number' | 'name' | 'expiry' | 'cvc' | undefined>(undefined)
    const [form, setForm] = useState<Form>({
        number: '', 
        name: '',
        expiry: '',
        cvc: ''
    })

    //setAllfieldsFilled(Object.values(form).every(value => value.trim() !== ''))


    

    const changeFocus = (e:ChangeEvent<HTMLInputElement>):void=>{
        setFocused(e.target.name as 'number' | 'name' | 'expiry' | 'cvc')
    }

    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        setForm({ ...form, [name]:value })        
    }   

    const checkDate = ()=>{
        const expiry = inputDate(form.expiry)
        const month = expiry.substring(0, 2)
        const year = expiry.substring(3)
        const currentDate = new Date().toLocaleDateString()
        const currentYear = currentDate.substring(8)
        
        

        if(expiry.length < 5){
            alert('A data deve ter 4 algarismos, 2 para o mês e 2 para o anos. Ex.: 12/24, que informa a data 25 de dezembro')

            return
        }

        if(expiry.indexOf('/') !== 2){
            alert('Formato de data inválido')

            return
        }

        if(parseInt(month) > 12){
            alert(`Data inválida. Não há mês ${month}`)

            return false
        }else if(parseInt(year) < parseInt(currentYear)){
            alert('O vencimento aponta para um ano inferior ao atual!')
            
            return false
        }

        return true
    }



    const isFormValid = ()=>{
        
        if(
            form.number.length >= 16 && form.number.length <= 19
            && form.name.length > 0
            && inputDate(form.expiry).length === 5
            && form.cvc.length === 3
        ){
            if(!checkDate()) return
            else setAllfieldsFilled(true)
        }else{
            alert('Complete os dados do cartão!')
            setAllfieldsFilled(false)

            return
        }

    }


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        /* if (e.charCode < 48 || e.charCode > 57) {
          e.preventDefault() 
        } */

        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }
    }

    const nonNumericInput = (e:React.KeyboardEvent<HTMLInputElement>) =>{
        /* if (e.charCode >= 48 && e.charCode <= 57) {
            e.preventDefault() 
        }   */

        if (/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }
    }

    
    
    
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
                                    }}/>
                            </label>
                            <input 
                                type="radio"
                                value='PayPal'
                                checked={selectedValue === 'PayPal' && textPopup}
                                name="payment"
                                id="payPal"
                                onChange={handleRadioButton} />
                        </div>
                    </div>
                    ) : (
                    <div className="credit-container">
                        <Cards
                            number={form.number}
                            name={form.name}
                            expiry={form.expiry}
                            cvc={form.cvc}
                            focused={focused}
                            />
                        <div>
                            <form className='form'>
                                <input
                                    disabled={cartLength ? false : true}
                                    className='card-number' 
                                    type="text"
                                    onKeyPress={handleKeyPress} 
                                    name="number"
                                    value={form.number}
                                    maxLength={19}
                                    placeholder='Número do cartão'
                                    onChange={onChange}
                                    onFocus={changeFocus} />
                                <input 
                                    disabled={cartLength ? false : true}
                                    className='card-number'
                                    type="text"
                                    name="name"
                                    onKeyPress={nonNumericInput}
                                    value={form.name}
                                    placeholder='Nome do titular'
                                    onChange={onChange}
                                    onFocus={changeFocus} />
                                <div className="thirdLine-container">
                                    <input 
                                        disabled={cartLength ? false : true}
                                        className='card-expiry'
                                        type="text"
                                        name="expiry"
                                        onKeyPress={handleKeyPress}
                                        value={inputDate(form.expiry)}
                                        maxLength={5}
                                        placeholder='Vencimento'
                                        onChange={onChange}
                                        onFocus={changeFocus}
                                        onBlur={checkDate} />
                                    <input 
                                        disabled={cartLength ? false : true}
                                        className='card-cvc'
                                        type="text"
                                        name="cvc"
                                        onKeyPress={handleKeyPress}
                                        maxLength={3}
                                        value={form.cvc}
                                        placeholder='CVC'
                                        onChange={onChange}
                                        onFocus={changeFocus} />
                                </div>
                            </form>   
                            <div className="button-container">
                                <button onClick={() =>{
                                    setForm({
                                        number:'',
                                        name:'',
                                        expiry:'',
                                        cvc:''
                                    })
                                    setAllfieldsFilled(false)
                                }}>Limpar</button>
                                <button onClick={isFormValid}>Selecionar cartão</button>
                            </div>    
                        </div>             
                    </div>
                    )
            }
        </Container>
    )
}

export default Payment_methods