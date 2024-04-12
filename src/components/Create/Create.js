import React from "react";
import api from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Create() {

    const navigat = useNavigate()
    const [input, setInput] = useState({ description: '', duedate: '', done: false, hide: false })

    function handleSubmit(event) {
        event.preventDefault()
        api.post('http://localhost:3002/tarefas', input)
        .then(res => { navigat('/') }).catch(err => console.log(err))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="description" >Descrição:</label>
                <input type="text" name="description" required onChange={e => setInput({ ...input, description: e.target.value })} />

                <label htmlFor="dueDate">Data de Conlusão:</label>
                <input type="date" name="dueDate" required onChange={e => setInput({ ...input, duedate: e.target.value })} />

                <button type="submit">Salvar</button>
            </form>
            <button><Link to={`/`} >Cancelar</Link></button>
        </div>
    )
}

export default Create;