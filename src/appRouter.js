import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Create from "./components/Create/Create";
import Update from "./components/Update/Update";    

function AppRouter() {
return(
    <BrowserRouter>
    <Routes>
        <Route path = '/' element = {<App/>}/>
        <Route path = '/create' element = {<Create/>}/>
        <Route path = '/update/:id' element = {<Update/>}/>
    </Routes>                   
    </BrowserRouter>                    
)                   
}                    

export default AppRouter