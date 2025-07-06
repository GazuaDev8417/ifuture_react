import { ChangeEvent, FC, FormEvent, useEffect, useState, useContext } from "react"
import Context, { GlobalStateContext } from "../../global/Context"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { IoIosArrowBack } from 'react-icons/io'
import ifutureLogo from '../../imgs/logo-future-eats-invert.png'
import { Container } from "./styled"
import formatPhoneNumber from "../../utils/formatPhoneNumber"
import { handleKeyPress } from "../../utils/cpf_mask"



interface FormData{
    username:string
    email:string
    phone:string
}


const EditProfile:FC = ()=>{
    const navigate = useNavigate()
    const { user } = useContext(Context) as GlobalStateContext
    const [form, setForm] = useState<FormData>({
        username: user.username,
        email: user.email,
        phone: formatPhoneNumber(user.phone)
    })



    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(!token){
            navigate('/ifuture_react')
        }
    }, [])


    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        setForm({ ...form, [name]:value })
    }

    const updaeProfile = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            username: form.username,
            email: form.email
        }
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }
        axios.patch(`${BASE_URL}/user`, body, headers).then(()=>{
            navigate('/ifuture_react/profile')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    /* const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode < 48 || e.charCode > 57) {
          e.preventDefault()
        }
    } */


    const clearForm = ()=>{
        setForm({
            username:'',
            email:'',
            phone:''
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
            <div className="title">Atualizar dados do usuário</div>
            <form onSubmit={updaeProfile}>
                <label htmlFor="username" className="sr-only">Nome do usuário</label>
                <input
                    id="username"
                    type="text"
                    className="form-input"
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    placeholder="Nome e sobrenome" 
                    autoComplete="name"
                    aria-label="Nome do usuário"
                    required/>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                    id="email"
                    type="email"
                    className="form-input"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="name@email.com" 
                    autoComplete="email"
                    aria-label="Email"
                    required/>
                <label htmlFor="phone" className="sr-only">Telefone</label>
                <input
                    id="phone"
                    type="tel"
                    className="form-input"
                    name="phone"
                    value={formatPhoneNumber(form.phone)}
                    onChange={onChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Número de telefone" 
                    autoComplete="tel"
                    aria-label="Número de telefone"
                    required/>
                <div className="btn-container">
                    <button className="btn" type="button" onClick={clearForm}>Limpar</button>
                    <button className="btn" type="submit">Atualizar</button>
                </div>
            </form>
        </Container>
    )
}

export default EditProfile