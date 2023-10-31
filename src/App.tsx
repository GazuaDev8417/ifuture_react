import { BrowserRouter } from "react-router-dom"
import { GlobalState } from "./global/Context"
import Router from "./routes/Router"
import { createGlobalStyle } from "styled-components"


const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  input{
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    height: 40px;
    padding-left: 10px;
  }

  button{
      border: none;
      border-radius: 5px;
      background-color: #b11717;
      box-shadow: 0 0 8px;
      outline: none;
      cursor: pointer;
      transition: .5s;
      &:hover{
          background-color: #dc2b2b;
      }
      &:active{
        transform: scale(.9);
      }

      .footer{
        position: absolute;
      }
  }

  .header-icon{
        font-size: 2rem;
        cursor: pointer;
        transition: .5s;
        &:hover{
            color: #b11717;
        }
        &:active{
            transform: scale(.9);
        }

    }
`


export default function App(){
  return(
    <BrowserRouter>
      <GlobalState>
        <GlobalStyle/>
        <Router/>
      </GlobalState>
    </BrowserRouter>
  )
}