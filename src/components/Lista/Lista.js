import React from "react"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import api from "../../services/api"


function Lista({input, arquivado}){ 

    const [records, setRecords] = useState([])
    const [rerender, setRerender] = useState(null)

    function deletarItem(id, descricao){
      if(window.confirm("Tem certeza que deseja deletar \"" + descricao + "\"?")){
        api.delete("/tarefas/"+id)
      }
    
    
  }

    useEffect(()=>{
      api.get('tarefas')
      .then(res => {
        setRecords (res.data)
      })
    },[rerender])


    function doneOrNot(done){
      if (done) {
        console.log(rerender)
        return  ("V")
        
      }else{
        console.log(rerender)
        return ("X")
      }
    }

    function hideOrNot(hide){
      if (hide) 
        return  ("Desarquivar")
      else
        return ("Arquivar")
    }


    function completeTask(objeto){
        if (objeto.done){
            api.put("/tarefas/"+objeto._id, {done: false})
        }
        else{
          api.put("/tarefas/"+objeto._id, {done: true})
        }
        setRerender (!rerender)
      }

  

    function formatDate(date){
        const dateCropped = date?.split("T")[0]
        var newDate = dateCropped.split(/\D/g)
        return [newDate[2],newDate[1],newDate[0] ].join("/")
      }

      function archiveTask(objeto){
        if (!objeto.hide){
            api.put("/hide/"+objeto._id, {hide: true})
        }
        else{
          api.put("/hide/"+objeto._id, {hide: false})
        }
        setRerender (!rerender)
      }

      function search (data, input, arquivado){ 
        
   
        const tarefas = data.slice().filter((tarefa) => {
          if (!input){
            return (tarefa.hide === arquivado )
          }else{
            return (
              tarefa&&
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
            search(records, input, arquivado).map ((d ,i) => ( 
              <tr key = {i} >
                <td>{d.description}</td>
                <td>{formatDate(d.duedate)}</td>
                <td>{d.done}</td>
                <td><button onClick={() => completeTask(d) } hidden = {d.hide}>{(d.done? "V": "X")}</button></td>
                <td><Link to={`update/${d._id}`} hidden = {d.hide}><button>editar</button></Link></td>
                <td><button onClick={(() => deletarItem(d._id,d.description))} >deletar</button></td>
                <td><button onClick={() => archiveTask (d)} hidden = {!d.done}>{hideOrNot(d.hide)}</button></td>
              </tr>
              
            ))
            }
        </tbody>
        </table>
        </div>
    )

}

export default Lista
