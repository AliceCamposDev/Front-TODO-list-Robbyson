import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../services/api.js"
import { useState } from "react"
import { Link } from "react-router-dom"

function  Update(){
    const {id} = useParams()
    const [data,setData] = useState([])
    const navigat = useNavigate()

    useEffect(()=>{
        api.get('tarefas/'+id)
        .catch(err => console.log(err))
        .then(res => {
          setData (res.data)
        })
      },[])
     
     function formatDate(date){
        const dateCropped = date?.split("T")[0]
        return dateCropped
      }


    function handleSubmit(event) {
        event.preventDefault()
        api.put ('tarefas/'+ id,data)
        .catch(err => console.log(err))
        .then (() => {
            navigat('/')
        })
    }
    return(
        <div>

            <form onSubmit={handleSubmit}> 
                <label htmlFor="description" >Descricao:</label>
                <input type="text" name="description" required value={data.description || ''}
                onChange  = {e => setData( {...data,description: e.target.value})
            }/>
               
                <label htmlFor="data">Data de conclusão:</label>
                
                <input type="date" name="duedate" required value={formatDate(data.duedate) || ''}
                onChange  = {e => setData({...data,duedate: e.target.value})}
                />
                <button type="submit">enviar</button>
            </form>
            <Link to={`/`} ><button>Cancelar</button></Link>
          
        </div>
    )
}
export default  Update;