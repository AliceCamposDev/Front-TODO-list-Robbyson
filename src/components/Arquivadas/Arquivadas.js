import React from "react"
import { useEffect, useState } from 'react'
//import { Link } from "react-router-dom"
import api from "../../services/api"

function Arquivadas({input}){ 

    const [records, setRecords] = useState([])
    const [results, setResults] = useState([])  
    const [tarefas, setTarefas] = useState([])

    useEffect(()=>{
      api.get('tarefas')
      .then(res => {
        setRecords (res.data)
        
      },[])
    })

    

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
      }

      function search (data, input){
        const tarefas = data.slice().filter((tarefa) => {
          return (
            input &&
            tarefa&&
            tarefa.description &&
            tarefa.description.toLowerCase().startsWith(input)
          )
          })
        const results = tarefas

        console.log(tarefas)
     
        //console.log("input " + input)
       //console.log("tarefas " + tarefas)
        //console.log("results " + results)


       /*function filtro (){

       (tarefas.filter((tarefa) => {
        return (
          input &&
          tarefa&&
          tarefa.description &&
          tarefa.description.toLowerCase().includes(input)
        )
        }))
      } */
      //setResults ()
        return tarefas
      }

      
    
    return (
        <div>
        <h1>{input}</h1>
        <h2>{}   a</h2>
        <table>
        <thead>
             <tr>
              <td></td>
            </tr> 
        </thead>
        <tbody>
          {
            search(records, input).map ((d ,i) => ( 
              <tr key = {i} hidden={!d.hide}>
                <td>{d.description}</td>
                <td>{formatDate(d.duedate)}</td>
                <td>{d.done}</td>
                <td><button onClick={() => archiveTask(d)}>Desarquivar</button></td>
              </tr>
              
            ))
            }
        </tbody>
        </table>
        </div>
    );

}

export default Arquivadas