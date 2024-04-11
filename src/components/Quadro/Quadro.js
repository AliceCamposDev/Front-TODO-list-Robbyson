import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Lista from "../Lista/Lista"

function Quadro(){

    const [input, setInput] = useState ('')
    const [arquivado,setArquivado]=useState(false)

    function archivedOrNot(archived){
      if (archived){
        return "Voltar"
      }else{
        return "Arquivadas"
      }
    }
  
return (
    <div className="container">
    <h1>Tarefas</h1>
      <div className="pesquisa">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
        <Link to="/create">Adicionar</Link>
        <button onClick={()=>setArquivado(!arquivado)}>{archivedOrNot(arquivado)}</button>
      </div>
      <div className="containner">


      <Lista input={input} arquivado={arquivado}/> 
  

      </div>

    </div>
)

}
export default Quadro