import React from "react"
import { useEffect, useState } from 'react'
import api from "../../services/api"

function Lista({input, arquivado}){ 

    const [records, setRecords] = useState([])
    const [tarefas, setTarefas] = useState([])
    const [rerender, setRerender] = useState(0)

    useEffect(()=>{
      api.get('tarefas')
      .then(res => {
        setRecords (res.data)
      })
    },[rerender])


    function doneOrNot(done){
      if (done) 
        return  ("V")
      else
        return ("X")
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
        rerenderPage()
      }

    function rerenderPage(){
      setRerender (rerender + 1)
      console.log(rerender)
    }

    function formatDate(date){
        const dateCropped = date?.split("T")[0]
        return dateCropped
      }

      function archiveTask(objeto){
        if (!objeto.hide){
            api.put("/tarefas/"+objeto._id, {hide: true})
        }
        else{
          api.put("/tarefas/"+objeto._id, {hide: false})
        }
        rerenderPage()
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
          //console.log(arquivado)
          //console.log(tarefas)
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
                <td><button onClick={() => completeTask(d)} hidden = {d.hide}>{doneOrNot(d.done)}</button></td>
                <td><button onClick={() => archiveTask (d)}>{hideOrNot(d.hide)}</button></td>
              </tr>
              
            ))
            }
        </tbody>
        </table>
        </div>
    );

}

export default Lista
