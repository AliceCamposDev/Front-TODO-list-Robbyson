import React from "react"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import api from "../../services/api"


function Lista({ input, arquivado }) {

  const [records, setRecords] = useState([])
  const [dbReturn, setDbReturn] = useState(null)

  useEffect(() => {
    api.get('tarefas')
      .then(res => {
        setRecords(res.data)
      })
  }, [dbReturn])

  function deletarItem(id, descricao) {
    if (window.confirm("Tem certeza que deseja deletar \"" + descricao + "\"?")) {
      api.delete("/tarefas/" + id)
    }
  }

  async function completeTask(objeto) {
    if (objeto.done) {
      setDbReturn(await api.put("/tarefas/" + objeto._id, { done: false }))
    }
    else {
      setDbReturn(await api.put("/tarefas/" + objeto._id, { done: true }))
    }
  }

  async function archiveTask(objeto) {
    if (!objeto.hide) {
      setDbReturn(await api.put("/hide/" + objeto._id, { hide: true }))
    }
    else {
      setDbReturn(await api.put("/hide/" + objeto._id, { hide: false }))
    }
  }

  function formatDate(date) {
    const dateCropped = date?.split("T")[0]
    var newDate = dateCropped.split(/\D/g)
    return [newDate[2], newDate[1], newDate[0]].join("/")
  }

  function search(data, input, arquivado) {
    const tarefas = data.slice().filter((tarefa) => {
      if (!input) {
        return (tarefa.hide === arquivado)
      } else {
        return (
          tarefa &&
          tarefa.description &&
          tarefa.hide === arquivado &&
          tarefa.description.toLowerCase().startsWith(input)
        )
      }
    })
    return tarefas
  }

  return (
    <div>
      <table>
        <tbody>
          {
          search(records, input, arquivado).map((d, i) => (
            <tr key={i} >
              <td>{d.description}</td>
              <td>{formatDate(d.duedate)}</td>
              <td>{d.done}</td>
              <td><button onClick={() => completeTask(d)} hidden={d.hide}>{(d.done ? "V" : "X")}</button></td>
              <td><Link to={`update/${d._id}`} hidden={d.hide}><button>editar</button></Link></td>
              <td><button onClick={(() => deletarItem(d._id, d.description))} >deletar</button></td>
              <td><button onClick={() => archiveTask(d)} hidden={!d.done}>{d.hide ? "Desarquivar" : "Arquivar"}</button></td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Lista
