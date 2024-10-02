import React from 'react'
import { useNavigate } from "react-router-dom"
function InfoNav() {
  const navigate=useNavigate();
  return (
    
    <div className='lista-specifikacija d-flex flex-column  m-auto'>
    <ul className='lista-spec2 d-flex flex-row justify-content-center list-unstyled align-items-center list-none  m-0'>
        <li className='m-3  'onClick={()=>{navigate("/info");}}>Today</li>
        <li className='m-3  ' onClick={()=>{navigate("/poSatima");}}>Hours</li>
        <li className='m-3  ' onClick={()=>{navigate("/Radar");}}>Daily</li>
        <li className='m-3 ' onClick={()=>{navigate("/Radar");}}>Radar</li>
        <li className='m-3 '>Minutecast</li>
        <li className='m-3 '>Mesecno</li>
     
    </ul>
  
  </div>
  )
}

export default InfoNav
