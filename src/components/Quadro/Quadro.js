import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Lista from "../Lista/Lista"
import Arquivadas from "../Arquivadas/Arquivadas"

function Quadro(){

    const [input, setInput] = useState ('')
    const [arquivado,setArquivado]=useState('')

return (
    <div className="container">
    <h1>Tarefas</h1>
      <div className="pesquisa">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
        <button>Pesquisar</button>
        <Link to="/create">Adicionar</Link>
        <button onClick={()=>setArquivado(!arquivado)}>Arquivadas</button>
      </div>
      <div className="containner">

    {
        arquivado?<Arquivadas input={input}/>:null
    }
    {
        !arquivado?<Lista/>:null
    }
     
      

      </div>

    </div>
)

}
export default Quadro