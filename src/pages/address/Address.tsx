import { ChangeEvent, FC, FormEvent, useState, useContext, useEffect } from "react"
import Context, { GlobalStateContext } from "../../global/Context"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import ifutureLogo from '../../imgs/logo-future-eats-invert.png'
import { Container } from "./styled"
import { IoIosArrowBack } from 'react-icons/io'
import { cepInputMask } from "../../utils/cpf_mask"



interface FormData{
    street:string
    cep:string
    number:string
    neighbourhood:string
    city:string
    state:string
    complement:string
}


const Address:FC = ()=>{
    const navigate = useNavigate()
    const { user, getProfile } = useContext(Context) as GlobalStateContext
    const [form, setForm] = useState<FormData>({
        street:'',
        cep:'',
        number:'',
        neighbourhood:'',
        city:'',
        state:'',
        complement:''
    })


    useEffect(()=>{
        getProfile()
    }, [])
    

    const findAddressByCep = ()=>{
        axios.get(`https://viacep.com.br/ws/${form.cep}/json/`).then(res=>{
            setForm({
                street:res.data.logradouro,
                cep:res.data.cep,
                number:'',
                neighbourhood:res.data.bairro,
                city:res.data.localidade,
                state:res.data.estado,
                complement:''
            })
        }).catch(e=>{
            alert(e.response.data)
        })
    }

    
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
            headers: { Authorization: localStorage.getItem('token') }
        }
        axios.patch(`${BASE_URL}/address/${user.id}`, body, headers).then(()=>{
            navigate('/ifuture_react/feed')
        }).catch(e=>{
            alert(e.response.data)
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
            cep:'',
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
            <div className="title">Cadastrar endereço</div>
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
                    name="cep"
                    onKeyPress={handleKeyPress}
                    value={cepInputMask(form.cep)}
                    maxLength={11}
                    onChange={onChange}
                    onBlur={findAddressByCep}
                    placeholder="CEP" 
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