import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Lista from "../Lista/Lista"
import "./Quadro.css"

function Quadro() {

  const [input, setInput] = useState('')
  const [arquivado, setArquivado] = useState(false)

  return (
    <div className="container">
      <h1>Tarefas</h1>
      <div className="pesquisa">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => setInput("")}>Limpar</button>
        <Link to="/create"><button>Adicionar</button></Link>
        <button onClick={() => setArquivado(!arquivado)}>{arquivado? "Voltar":"Arquivados"}</button>
      </div>
      <div className="listaDiv">
        <Lista input={input} arquivado={arquivado} />
      </div>
    </div>
  )
}
export default Quadro