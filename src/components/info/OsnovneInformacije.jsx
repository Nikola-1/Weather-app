import React, { useEffect, useState } from 'react'
import { SlArrowRight } from 'react-icons/sl';

// eslint-disable-next-line react/prop-types
const KvalitetVazduha = ({lat,long,slika}) => {
    const api={
        key:'bc4f82c3b09a35177e528f73874f69ab',
        key2:'fc2a72443d282020dea6d5eb248b528f',
      }
      
    
  
    async function Zagadjenost(latParam,longParam){
       
  console.log(latParam,longParam);
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latParam}&lon=${longParam}&appid=${api.key}`).then(
          function(response){
            console.log(response);
            
              return response.json();
          }
        ).then(function(response){
          console.log(response);
          localStorage.setItem("polution",JSON.stringify(response));
          
        });
  
          
          
        
       }
    const [poruka,setPoruka]=useState("");
function Kvalitet(){

    let CoParam = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['co'];
    let nh3Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['nh3'];
    let noParam = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['no'];
    let no2Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['no2'];
    let o3Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['o3'];
    let pm2_5Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['pm2_5'];
    let pm10Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['pm10'];
    let so2Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['so2'];
      if(so2Param <= 20 && no2Param <=40 && pm10Param <=20 && pm2_5Param <=10 && o3Param <=60 && CoParam <=4400){
        setPoruka("Dobar");
      }
      else if((so2Param >= 20 && so2Param <=80) && (no2Param >= 40 && no2Param <=70) && (pm10Param >= 20 && so2Param <=50) && (pm2_5Param >= 10 && so2Param <=25) && (o3Param >= 60 && o3Param <=100) && (so2Param >= 4400 && so2Param <=9400)){
      
          setPoruka("Solidan");
      }
      else if((so2Param >= 80 && so2Param <=250) && (no2Param >= 70 && no2Param <=150) && (pm10Param >= 50 && so2Param <=100) && (pm2_5Param >= 25 && so2Param <=50) && (o3Param >= 100 && o3Param <=140) && (so2Param >= 9400 && so2Param <=12400)){
     
        setPoruka("Srednji");
    }
    else if((so2Param >= 250 && so2Param <=350) && (no2Param >= 150 && no2Param <=200) && (pm10Param >= 100 && so2Param <=200) && (pm2_5Param >= 50 && so2Param <=75) && (o3Param >= 140 && o3Param <=180) && (so2Param >= 12400 && so2Param <=15400)){
      
        setPoruka("Slab");
  }
  else if(so2Param >= 350 && no2Param >= 200 && pm10Param >= 200 && pm2_5Param >= 75 && o3Param >= 180 && CoParam >= 15400){
    
    setPoruka("Veoma slab");
}
else{
    
    setPoruka("ll");
}


   }
   useEffect(()=>{
  
   Zagadjenost(lat,long);
   Kvalitet();
},[])
  return (
   
    <div className='w-50 m-auto main_Info d-flex flex-column justify-content-between align-items-center mb-5'>
    <div className='d-flex justify-content-between w-75'>
    <div className='d-flex'>
    <img width={69} height={69}  src={"https://openweathermap.org/img/wn/"+slika+".png"}/>
    <div className='d-flex flex-column '>
        <p className='velicina-50 Roboto-Condensed'>{JSON.parse(localStorage.getItem("location_Info"))['list']['0']['main']['temp']?.toFixed(0)}&deg;</p>
        <p className='Roboto-Condensed fw-bold'>RealFeel {JSON.parse(localStorage.getItem("location_Info"))['list']['0']['main']['feels_like']?.toFixed(0)}&deg;</p>
        </div>
        </div>
        <div className='main_info_details'>
          <div className='detail d-flex justify-content-between'>
          <div className='detail_name'><p>Udari vetra:</p></div>
          <div className='detail_value'>     <p>{JSON.parse(localStorage.getItem("location_Info"))['list']['0']['wind']['speed']}km/h</p></div>
   
        </div>
        <div className='detail d-flex justify-content-between'>
          <div className='detail_name'><p>Vetar:</p></div>
          <div className='detail_value'>   <p>{JSON.parse(localStorage.getItem("location_Info"))['list']['0']['wind']['speed']}km/h</p></div>
   
        </div>
        
        <div className='detail d-flex justify-content-between'>
          <div className='detail_name'><p>Kvalitet vazduha:</p></div>
          <div className='detail_value'>   {poruka}</div>
   
        </div>
        </div>
        </div>
        <div className='detail_value w-75 d-flex flex-column'>   <p className='fw-bold'>{JSON.parse(localStorage.getItem("location_Info"))['list']['0']['weather']['0']['description']}</p>
         <p>More details <SlArrowRight></SlArrowRight></p></div>
       
    </div>
    
  )
}

export default KvalitetVazduha
