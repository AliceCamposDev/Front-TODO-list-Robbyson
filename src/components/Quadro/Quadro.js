import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Lista from "../Lista/Lista"
import "./Quadro.css"
import "../../app.css"

function Quadro() {

  const [input, setInput] = useState('')
  const [arquivado, setArquivado] = useState(false)

  return (
    <div className="container">
      <h1 className="titulo">Tarefas</h1>
      <div className="pesquisa">
        <div className="barraPesquisa">
          <input className= "inputPesquisar" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          <button className="btnLimpar" onClick={() => setInput("")}>Limpar</button>
        </div>
        <div className="botoesQuadro">
          <Link to="/create"><button className="btnAdicionar">+</button></Link>
          <button className="btnArquivado" onClick={() => setArquivado(!arquivado)}>{arquivado? "⮠ ":"🗀"}</button>
        </div>
      </div>
      <div className="listaDiv">
        <Lista input={input} arquivado={arquivado} />
      </div>
    </div>
  )
}
export default Quadro