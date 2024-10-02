import './info.css';
import logo from "../../assets/img/Logo.png";
import { useEffect, useState } from 'react';
import moment from 'moment';

import 'leaflet/dist/leaflet.css'

import 'react-multi-carousel/lib/styles.css';
import OsnovneInformacije from './OsnovneInformacije';

import Prognoza3Sata from './Prognoza3Sata';
import DnevnaPrognoza from './DnevnaPrognoza';
import InfoNav from './InfoNav';
import PoSatima from '../poSatima/PoSatima';

import { useLocation } from 'react-router-dom';
import Mapa from './Mapa';


export default function Info(){
  const { pathname } = useLocation();
  console.log(pathname);
    const api={
        key:'bc4f82c3b09a35177e528f73874f69ab',
        key2:'fc2a72443d282020dea6d5eb248b528f',
      }
      const danasnjiDatum = new Date();
      danasnjiDatum.setHours(0,0,0,0);
      const pocetakDana = danasnjiDatum.getTime();
      const krajDana = pocetakDana + 86400000;
      // eslint-disable-next-line no-unused-vars
      const [data,setData] = useState();
    // eslint-disable-next-line no-unused-vars
      const [slikaTekst,setSlikaTekst]=useState('');
   
    const lat=JSON.parse(localStorage.getItem("town"))['lat'];
    const lon=JSON.parse(localStorage.getItem("town"))['lon'];
  
    
    async function slika(latParam,longParam){
       
  
        fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&lat=${latParam}&lon=${longParam}&units=metric&appid=${api.key}`).then(
          function(response){
              return response.json();
          }
        ).then(function(response){
          console.log(moment(new Date()).format("YYYY-MM-DD 18:00:00"))
          for(let i =0;i<response.list.length;i++){
          
            if(moment(new Date()).format("YYYY-MM-DD HH:00:00")<response.list[i]['dt_txt']){ //< je kako bi uzimao vreme unapred jer ne moze na svaki sat zato sto su razmaci po 3 sata 
              
              
              setSlikaTekst(response.list[i]['weather'][0]['icon']);
              break;
            }
            
          }
          localStorage.setItem("location_Info",JSON.stringify(response));
        });
 
          
          
        
       }
       
    async function fetchData(latParam,longParam){
        try{
         
          console.log(lat,lon)
            // eslint-disable-next-line no-unused-vars
            const data2= fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&lat=${latParam}&lon=${longParam}&units=metric&appid=${api.key}
                `).then(function(response) {
                  return response.json();
                }).then(function(response){
                  console.log(response)
                  setData(response.list);
                  localStorage.setItem("Country",JSON.stringify(response));
                  console.log(response.list);
                });
                
        }
        catch(e){
            console.log(e);
        }
       
    
    }
   
    const position = [lat, lon]
    

    useEffect(()=>{
        fetchData(lat,lon);
        slika(lat,lon);
 
        
    },[])
      var filtriranNiz=JSON.parse(localStorage.getItem('location_Info'))['list'].filter(prognoza=>{
        const vremePrognoze = prognoza.dt * 1000; // Pretvori Unix timestamp u milisekunde
        return vremePrognoze >= pocetakDana && vremePrognoze < krajDana;
      });
    return(
        <>
            <div className='w-100'>
            <nav className="navigationInfo d-flex">
            <div className="d-flex justify-content-center align-items-center">
            <img src={logo} width={50} height={50}></img>
            <h1>WetherWise</h1>
            </div>
            <div className='d-flex justify-content-center align-items-center m-3'>
                <h3>{JSON.parse(localStorage.getItem("town"))['name']},</h3><h3>{JSON.parse(localStorage.getItem("town"))['state']}</h3>
                <img src={"https://openweathermap.org/img/wn/"+slikaTekst+".png"}/>
            </div>
            </nav>
            <InfoNav></InfoNav>
            
            {pathname == "/poSatima" ?  <PoSatima nizPrognoza={filtriranNiz} /> : <></>}
          
          
            {/*Info*/}


        
      {pathname == "/info" ? 
        <><OsnovneInformacije lat={lat} long={lon} slika={slikaTekst}></OsnovneInformacije>
       
     
            <div className='w-50 m-auto hour_forecast d-flex flex-column justify-content-between align-items-start mb-5'>
          <p className='Roboto Condensed fw-bold text-white'>PROGNOZA NA 3 SATA</p>
          <div className='hour_forecast_div '>
          
                <Prognoza3Sata pocetakDana={pocetakDana} danasnjiDatum={danasnjiDatum} krajDana={krajDana}></Prognoza3Sata>
          </div>
          </div>
          <DnevnaPrognoza></DnevnaPrognoza>
            </>
       :
        <></>}
        {pathname == "/Radar" ? <Mapa position={position}></Mapa> : <></> }
            </div>
            
        </>
    )
}
