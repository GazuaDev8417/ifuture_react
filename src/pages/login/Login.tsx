import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import ifutureLogo from '../../imgs/logo-future-eats-invert.png'
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom"
import { Container } from "./styled"
//import Modal from "../../components/Modal"


interface FormData{
    email:string
    password:string
}


const Login:FC = ()=>{
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [form, setForm] = useState<FormData>({
        email:'visitante@email.com',
        password:'123456'
    })



    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        if(token){
            navigate('/ifuture_react/feed')
        }
    }, [])

    useEffect(()=>{
        const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        if(isMobileDevice){
            setShowModal(true)
        }
    }, [])


    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        setForm({ ...form, [name]:value })
    }

    const login = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            email: form.email,
            password: form.password
        }

        axios.post(`${BASE_URL}/login`, body).then(res=>{
            localStorage.setItem('token', res.data)
            navigate('/ifuture_react/feed')
            console.log('whats worong?')
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    
    return(
        <Container>
            <img  
                src={ifutureLogo}
                alt="imagem"/>
            <div className="title">Login</div>
            {/* { showModal && <Modal setShowModal={setShowModal}/> } */}
            <form onSubmit={login}>
                <input
                    type="email"
                    className="form-input"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="name@email.com"
                    autoFocus 
                    required/>
                    {
                        !showPass ? (
                            <FaEyeSlash onClick={()=> setShowPass(true)} className='eye-icon' />
                        ) : <FaEye onClick={()=> setShowPass(false)} className='eye-icon' />
                    }
                <input
                    type={!showPass ? 'password' : 'text'}
                    className="form-input"
                    name="password"
                    value={form.password}
                    onChange={onChange} 
                    placeholder="Mínimo de 6 caractéres"
                    required/>
                <button>Entrar</button>
            </form>
            <p>
                Não possui cadastro? clique <Link to='/ifuture_react/signup'> aqui</Link>
            </p>
        </Container>
    )
}

export default Login