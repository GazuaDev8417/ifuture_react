import { ChangeEvent, FC, FormEvent, useEffect, useState, useContext } from "react"
import Context, { GlobalStateContext } from "../../global/Context"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { IoIosArrowBack } from 'react-icons/io'
import ifutureLogo from '../../imgs/logo-future-eats-invert.png'
import { cpfInputMask } from "../../utils/cpf_mask"
import { Container } from "./styled"



interface FormData{
    username:string
    email:string
    cpf:string
}


const EditProfile:FC = ()=>{
    const navigate = useNavigate()
    const { user } = useContext(Context) as GlobalStateContext
    const [form, setForm] = useState<FormData>({
        username: user.username,
        email: user.email,
        cpf: ''
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
            name: form.username,
            email: form.email,
            cpf: Number(form.cpf)
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


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode < 48 || e.charCode > 57) {
          e.preventDefault()
        }
    }


    const clearForm = ()=>{
        setForm({
            username:'',
            email:'',
            cpf:''
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
                <div className="btn-container">
                    <button className="btn" type="button" onClick={clearForm}>Limpar</button>
                    <button className="btn" type="submit">Atualizar</button>
                </div>
            </form>
        </Container>
    )
}

export default EditProfile