import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import Header from "../../components/Header"
import { IoIosArrowBack } from "react-icons/io"
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
    //const [showModal, setShowModal] = useState<boolean>(false)
    const [form, setForm] = useState<FormData>({
        email:'',
        password:''
    })



    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        if(token){
            navigate('/ifuture_react/feed')
        }
    }, [])

    /* useEffect(()=>{
        const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        if(isMobileDevice){
            setShowModal(true)
        }
    }, []) */


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
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    
    return(
        <>
            <Header
                leftIcon={
                    <IoIosArrowBack 
                        className="header-icon"
                        onClick={()=> navigate('/ifuture_react/detail')} />
                }
                center={ <h2 className="logo-title">REDE SOCIAL FAST-FOOD</h2> }
                rightIcon={ <div/> }
                />
            <Container>
                
                <div className="title">Login</div>
                {/* { showModal && <Modal setShowModal={setShowModal}/> } */}
                <form onSubmit={login}>               
                    <div className="input-icon-container">
                        <label htmlFor="login-email" className="sr-only">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            className="form-input"
                            name="userEmail"
                            value={form.email}
                            onChange={onChange}
                            placeholder="name@email.com"
                            aria-label="Endereço de email"
                            autoFocus 
                            required/>
                        <label htmlFor="login-password" className="sr-only">Senha</label>
                        <input
                            id="login-password"
                            type={!showPass ? 'password' : 'text'}
                            name="userPassword"
                            className="form-input"
                            value={form.password}
                            onChange={onChange} 
                            placeholder="Sua senha"
                            aria-label="Senha"
                            required/>
                        {
                            !showPass ? (
                                <FaEyeSlash onClick={()=> setShowPass(true)} className='eye-icon' />
                            ) : <FaEye onClick={()=> setShowPass(false)} className='eye-icon' />
                        }
                    </div>
                    <div className="btn-container">
                        <button className="login-button" onClick={() => setForm({ email:'', password:'' })}>Limpar</button>
                        <button className="login-button" type="submit">Entrar</button>
                    </div>
                </form>
                <p>
                    Não possui cadastro? clique <Link to='/ifuture_react/signup'> aqui</Link>
                </p>
            </Container>
        </>
    )
}

export default Login