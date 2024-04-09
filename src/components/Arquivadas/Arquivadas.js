import React from "react"
import { useEffect, useState } from 'react'
//import { Link } from "react-router-dom"
import api from "../../services/api"

function Arquivadas({input}){ 

    const [records, setRecords] = useState([])
    

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

    
            function findIndx (element) {
                if (element.description.toLowerCase().startsWith(input.toLowerCase()))
                return true
            }
        //let  idx  = data?.indexOf(findIndx)
        //console.log ("idx" + idx)

        console.log("data = "+ data)
        console.log("posição = " + data?.findIndex(findIndx))
        console.log("input = " + input)
        console.log("desc  = " + data[1]?.description)

        return "asdasd"
      }
    return (
        <div>
        <h1>{input}</h1>
        <h2>{search(records, input)}</h2>
        <table>
        <thead>
             <tr>
              <td></td>
            </tr> 
        </thead>
        <tbody>
          {
            records.map ((d ,i) => ( 
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