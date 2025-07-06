import { ChangeEvent, FC, FormEvent, useState, useContext, useEffect } from "react"
import Context, { GlobalStateContext } from "../../global/Context"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import ifutureLogo from '../../imgs/logo-future-eats-invert.png'
import { Container } from "./styled"
import { IoIosArrowBack } from 'react-icons/io'
import { handleKeyPress } from "../../utils/cpf_mask"



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
    const { user, getProfile, updateAddress, setUpdateAddress, registAddress } = useContext(Context) as GlobalStateContext
    const [form, setForm] = useState<FormData>({
        street: updateAddress ? user.street : '',
        cep: updateAddress ? user.cep : '',
        number: updateAddress ? user.number : '',
        neighbourhood: updateAddress ? user.neighbourhood : '',
        city: updateAddress ? user.city : '',
        state: updateAddress ? user.state : '',
        complement: updateAddress ? user.complement : ''
    })
    


    useEffect(()=>{
        if(!updateAddress && !registAddress){
            navigate('/ifuture_react/feed')
        }       
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


    const alterAddress = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            street: form.street,
            cep: form.cep,
            number: form.number,
            neighbourhood: form.neighbourhood,
            city: form.city,
            state: form.state,
            complement: form.complement
        }
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }
        
        axios.patch(`${BASE_URL}/address`, body, headers).then(()=>{
            navigate(updateAddress ? '/ifuture_react/profile' : '/ifuture_react/feed')
            setUpdateAddress(false)
        }).catch(e=>{
            alert(e.response.data)
        })
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
            {updateAddress ? (
                <IoIosArrowBack
                    onClick={()=> {
                        setUpdateAddress(false)
                        navigate(-1)
                    }} 
                    className='icon'/>
            ) : null}
            <img  
                src={ifutureLogo}
                alt="imagem"/>
            <div className="title">{updateAddress ? 'Atualizar endereço' : 'Cadastrar endereço'}</div>
            <form onSubmit={alterAddress}>
                <label htmlFor="address" className="sr-only">Endereço</label>
                <input
                    id="address"
                    type="text"
                    className="form-input"
                    name="street"
                    value={form.street}
                    onChange={onChange}
                    placeholder="Rua / Avenida / Travessa ..." 
                    autoComplete="street-address"
                    aria-label="Endereço"
                    required/>
                <label htmlFor="cep" className="sr-only">CEP</label>
                <input
                    id="cep"
                    type="text"
                    className="form-input"
                    name="cep"
                    onKeyPress={handleKeyPress}
                    value={form.cep}
                    maxLength={10}
                    onChange={onChange}
                    onBlur={findAddressByCep}
                    placeholder="CEP" 
                    autoComplete="postal-code"
                    aria-label="cep"
                    required/>
                <label htmlFor="number" className="sr-only">Número</label>
                <input
                    id="number"
                    type="text"
                    className="form-input"
                    name="number"
                    onKeyPress={handleKeyPress}
                    value={form.number}
                    onChange={onChange}
                    placeholder="Número"
                    autoComplete="street-address"
                    aria-label="número"/>
                <label htmlFor="neighbourhood" className="sr-only">Bairro</label>
                <input
                    id="neighbourhood"
                    type="text"
                    className="form-input"
                    name="neighbourhood"
                    value={form.neighbourhood}
                    onChange={onChange}
                    placeholder="Bairro" 
                    autoComplete="street-address"
                    aria-label="Bairro"
                    required/>
                <label htmlFor="city" className="sr-only">Cidade</label>
                <input
                    id="city"
                    type="text"
                    className="form-input"
                    name="city"
                    value={form.city}
                    onChange={onChange} 
                    placeholder="Cidade"
                    autoComplete="street-address"
                    aria-label="Cidade"
                    required/>
                <label htmlFor="state" className="sr-only">Estado</label>
                <input
                    id="state"
                    type="text"
                    className="form-input"
                    name="state"
                    value={form.state}
                    onChange={onChange} 
                    placeholder="Estado"
                    autoComplete="street-address"
                    aria-label="Estado"
                    required/>
                <label htmlFor="complement" className="sr-only">Complemento</label>
                <input
                    id="complement"
                    type="text"
                    className="form-input"
                    name="complement"
                    value={form.complement}
                    onChange={onChange} 
                    placeholder="Complemento"
                    autoComplete="street-address"
                    aria-label="Complemento"/>
                <div className="btn-container">
                    <button className="address-button" type="button" onClick={clearForm}>Limpar</button>
                    <button className="address-button" type="submit">{updateAddress ? 'Atualizar' : 'Registrar'}</button>
                </div>
            </form>
        </Container>
    )
}

export default Address