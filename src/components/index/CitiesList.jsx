/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { MyContext } from "../../MyContext";
import Moment from "react-moment";
import Search from "./Search";
import moment from "moment";

export default function CitiesList({town,lat,long}){

    const api={
        key:'bc4f82c3b09a35177e528f73874f69ab',
      }
      const {geo,setGeo} = useContext(MyContext);
      const geoCodingApi={
        key:'2bec3798091aad42691ee40c041909e6'
      }
      const [data,setData]=useState([]);
      const [prosTemp,setProsTemp]=useState({});
      
      async function fetchData(latParam,longParam){
        try{
          console.log(town);
          console.log(lat,long)
            const data2= fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&lat=${latParam}&lon=${longParam}&units=metric&appid=${api.key}
                `).then(function(response) {
                  return response.json();
                }).then(function(response){
                  console.log(response)
                  setData(response.list);
                  console.log(response.list);
                });
                
        }
        catch(e){
            console.log(e);
        }
       
    
    }
   
    
    async function prosecnaTemperatura(latParam,longParam){
      var ukupnaTemperatura=0;
      var prosecnaTemperatura=0;
      
     const lista=await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&lat=${latParam}&lon=${longParam}&units=metric&appid=${api.key}`);
     const podaci=await lista.json();
    
        for(var i =0;i< podaci.list.length;i++){
          ukupnaTemperatura+=podaci.list[i].main.temp_min;
        }
        prosecnaTemperatura=ukupnaTemperatura/podaci.list.length;

        setProsTemp(prevState => ({
          ...prevState, [`${latParam},${longParam}`]: prosecnaTemperatura
        }));
        
       return prosTemp;
     }
     
    
   async function fetchGeoCoding(){
    try{
      const data3=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${town},RS&limit=40&appid=${geoCodingApi.key}`)
      .then(function(response){
        return response.json();
      }).then(function(response){
        
        console.log(response);
       setGeo(response);
       
      
      });

    }
    catch(e){
      console.log(e);
    }
   }
    
    useEffect(()=>{
      fetchGeoCoding();
       
         
        
     },[lat,long])
     useEffect(()=>{
      fetchData(lat,long);
       
         
        
     },[town])
     useEffect(()=>{
      if(geo.length > 0){
        geo.forEach(item => {
          prosecnaTemperatura(item.lat,item.lon);
          
        });
        
      }
      
     },[geo]);
    return(
      
        <>
        
        <div className="ListOCWrapper d-flex flex-column">
            <h3 className="CountrySelected">{town}</h3>
            <div className="ListOfCities">
            {geo.map((item,index)=><div className="City d-flex p-3 flex-row justify-content-between align-items-center">
                         
                            <h3>{item.name}</h3>
                            <img src={"https://openweathermap.org/img/wn/01d.png"}></img>
                            <p className="temperature">{prosTemp[`${item.lat},${item.lon}`]?.toFixed(0)}°C</p>
                    </div>)}
                    
                   
                    
            </div>
            </div>
        </>
    )
}

//<img src={`https://openweathermap.org/img/wn/`+item.weather[0]["icon"]+`@2x.png`} width={60} height={60}/>
//<span className="temperature">{parseInt(item.main.temp_max)}°</span>
//<Moment date={item.dt_txt} format="MM-DD HH "/>