import React from "react";
import api from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Create.css"
import "../../app.css"

function Create() {

    const navigat = useNavigate()
    const [input, setInput] = useState({ description: '', duedate: '', done: false, hide: false })

    function handleSubmit(event) {
        event.preventDefault()
        api.post('http://localhost:3002/tarefas', input)
        .then(res => { navigat('/') }).catch(err => console.log(err))
    }
    return (
        <div className="createContainer">
            <form onSubmit={handleSubmit}>
                <div className="descricao">
                    <label htmlFor="description" >Descrição:</label>
                    <input type="text" name="description" required onChange={e => setInput({ ...input, description: e.target.value })} />
                </div>
                <div className="data">
                    <label htmlFor="dueDate">Data de Conlusão:</label>
                    <input type="date" name="dueDate" required onChange={e => setInput({ ...input, duedate: e.target.value })} />
                </div>
                <div className="botoes">
                    <button type="submit">Salvar</button>
                    <button><Link to={`/`} >Cancelar</Link></button>
                </div>
            </form>
        </div>
    )
}

export default Create;