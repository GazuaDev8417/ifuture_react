import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import ifutureLogo from '../../imgs/logo-future-eats-invert.png'
import { cpfInputMask } from "../../utils/cpf_mask"
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { Container } from "./styled"



interface FormData{
    username:string
    email:string
    cpf:string
    password:string
    confirmPass:string
}


const Signup:FC = ()=>{
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState<boolean>(false)
    const [showPass2, setShowPass2] = useState<boolean>(false)
    const [form, setForm] = useState<FormData>({
        username:'',
        email:'',
        cpf: '',
        password:'',
        confirmPass:''
    })



    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(token){
            navigate('/ifuture_react/feed')
        }
    }, [])


    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        setForm({ ...form, [name]:value })
    }

    const signup = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            name: form.username,
            email: form.email,
            cpf: Number(form.cpf),
            password: form.password
        }
        axios.post(`${BASE_URL}/signup`, body).then(res=>{
            localStorage.setItem('token',res.data.token)
            navigate('/ifuture_react/address')
        }).catch(e=>{
            alert(e.response.data.message)
        })
    }


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode < 48 || e.charCode > 57) {
          e.preventDefault() 
        }
    }


    const clearForm = ()=>{
        setForm({
            username:'',
            email:'',
            cpf:'',
            password:'',
            confirmPass:''
        })
    }


    
    return(
        <Container>
            <img  
                src={ifutureLogo}
                alt="imagem"/>
            <div className="title">Cadastro</div>
            <form onSubmit={signup}>
                <input
                    type="text"
                    className="form-input"
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    placeholder="Nome e sobrenome" 
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="cpf"
                    onKeyPress={handleKeyPress}
                    maxLength={11}
                    value={cpfInputMask(form.cpf)}
                    onChange={onChange}
                    placeholder="CPF (Somente números)" 
                    required/>
                <input
                    type="email"
                    className="form-input"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="name@email.com" 
                    required/>
                <input
                    type={showPass ? 'text' : 'password'}
                    className="form-input"
                    name="password"
                    value={form.password}
                    onChange={onChange} 
                    placeholder="Mínimo de 6 caractéres"
                    required/>
                {
                    !showPass ? (
                        <FaEyeSlash onClick={()=> setShowPass(true)} className='eye-icon' />
                    ) : <FaEye onClick={()=> setShowPass(false)} className='eye-icon' />
                }
                <input
                    type={showPass2 ? 'text' : 'password'}
                    className="form-input"
                    name="confirmPass"
                    value={form.confirmPass}
                    onChange={onChange} 
                    placeholder="Confirme sua senha"
                    required/>
                {
                    !showPass2 ? (
                        <FaEyeSlash onClick={()=> setShowPass2(true)} className='eye-icon2' />
                    ) : <FaEye onClick={()=> setShowPass2(false)} className='eye-icon2' />
                }
                <div className="btn-container">
                    <div className="submit-btn">
                        <button type="button" onClick={clearForm}>Limpar</button>
                        <button type="submit">Registrar</button>
                    </div>
                    <button type="button"
                        onClick={()=> navigate('/ifuture_react')}>Voltar para login</button>
                </div>
            </form>
        </Container>
    )
}

export default Signup