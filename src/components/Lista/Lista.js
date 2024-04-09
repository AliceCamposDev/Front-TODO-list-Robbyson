import React from "react"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import api from "../../services/api"
import Quadro from "../Quadro/Quadro"

function deletarItem(id){
    api.delete("/tarefas/"+id)
}

function Lista(){

    const [colums, setColumns] = useState([])
    const [records, setRecords] = useState([])

    useEffect(()=>{
      api.get('tarefas')
      .then(res => {
        setColumns(Object.keys(res.data[0]))
        setRecords (res.data)
      },[])
    })

    function formatDate(date){
      const dateCropped = date?.split("T")[0]
      return dateCropped
    }

    function trueOrFalse(concluido){
        if (concluido) 
          return  ("V")
        else
          return ("X")
      }

      function completeTask(objeto){
          if (objeto.done){
              api.put("/tarefas/"+objeto._id, {done: false})
            console.log(objeto.done)
          }
          else{
            api.put("/tarefas/"+objeto._id, {done: true})
          }
        }

        function archiveTask(objeto){
          if (!objeto.hide){
              api.put("/tarefas/"+objeto._id, {hide: true})
          }
          else{
            api.put("/tarefas/"+objeto._id, {hide: false})
          }
        }
  

    return (
      <div>
        <h1></h1>
      <table>
        <thead>
             <tr>
              <td></td>
            </tr> 
        </thead>
        <tbody>
          {
            records.map ((d ,i) => (
              <tr key = {i} hidden={d.hide}>
                <td>{d.description}</td>
                <td>{formatDate(d.duedate)}</td>
                <td>{d.done}</td>
                <td><button onClick={() => completeTask(d)}>{trueOrFalse(d.done)}</button></td>
                <td><button onClick={() => archiveTask(d)}>Arquivar</button></td>
                <td><Link to={`update/${d._id}`}>editar</Link></td>
                <td><button onClick={(() => deletarItem(d._id))}>deletar</button></td>
              </tr>
              
            ))
          }
        </tbody>
        </table>
    </div>
     );
}

export default Lista