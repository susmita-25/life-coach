import React from 'react';
import {
    BrowserRouter,
    Route
  } from "react-router-dom"; 
import { Button } from '@mui/material';
import App from './App';

const Routing = ({dataParentToChild,sendDataToParent}) => {

return(
    <div>
    <BrowserRouter>
     <Route path="/" element={<App/>} ></Route>
     {/* <Route path="/" element={<App/>} ></Route>   */}
    </BrowserRouter>
   <Button onClick={()=>{sendDataToParent('child to parent')}}>Hi</Button> 
   </div>
)
}

export default Routing;