import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import ifutureLogo from '../../imgs/logo-future-eats-invert.png'
import { Container } from "./styled"
import { IoIosArrowBack } from 'react-icons/io'



interface FormData{
    street:string
    number:string
    neighbourhood:string
    city:string
    state:string
    complement:string
}


const Address:FC = ()=>{
    const navigate = useNavigate()
    const [form, setForm] = useState<FormData>({
        street:'',
        number:'',
        neighbourhood: '',
        city:'',
        state:'',
        complement:''
    })



    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(token){
            navigate('/feed')
        }
    }, [])


    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        setForm({ ...form, [name]:value })
    }

    const updateAddress = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            street: form.street,
            number: form.number,
            neighbourhood: form.neighbourhood,
            city: form.city,
            state: form.state,
            complement: form.complement
        }
        const headers = {
            headers: { auth: localStorage.getItem('token') }
        }
        axios.put(`${BASE_URL}/address`, body, headers).then(()=>{
            navigate('/feed')
        }).catch(e=>{
            alert(e.response.data.message)
            console.log(e.response)
        })
    }


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode < 48 || e.charCode > 57) {
          e.preventDefault() // Prevent input of non-numeric characters
        }
    }


    const clearForm = ()=>{
        setForm({
            street:'',
            number:'',
            neighbourhood: '',
            city:'',
            state:'',
            complement:''
        })
    }
    

    
    return(
        <Container>
            <IoIosArrowBack
                onClick={()=> navigate(-1)} 
                className='icon'/>
            <img  
                src={ifutureLogo}
                alt="imagem"/>
            <div className="title">Adicionar ou atualizar endereço</div>
            <form onSubmit={updateAddress}>
                <input
                    type="text"
                    className="form-input"
                    name="street"
                    value={form.street}
                    onChange={onChange}
                    placeholder="Rua / Avenida / Travessa ..." 
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="number"
                    onKeyPress={handleKeyPress}
                    value={form.number}
                    onChange={onChange}
                    placeholder="Númbero" 
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="neighbourhood"
                    value={form.neighbourhood}
                    onChange={onChange}
                    placeholder="Bairro" 
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="city"
                    value={form.city}
                    onChange={onChange} 
                    placeholder="Cidade"
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="state"
                    value={form.state}
                    onChange={onChange} 
                    placeholder="Estado"
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="complement"
                    value={form.complement}
                    onChange={onChange} 
                    placeholder="Complemento"/>
                <div className="btn-container">
                    <button type="button" onClick={clearForm}>Limpar</button>
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </Container>
    )
}

export default Address