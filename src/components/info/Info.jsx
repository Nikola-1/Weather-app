import './info.css';
import logo from "../../assets/img/Logo.png";
import { useEffect, useState } from 'react';
import moment from 'moment';
import { SlArrowRight } from "react-icons/sl";
import { MapContainer,Popup,Marker,TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import pressure from "../../assets/img/Pressure.png";
import Clouds from "../../assets/img/Clouds.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
export default function Info(){
    const api={
        key:'bc4f82c3b09a35177e528f73874f69ab',
        key2:'fc2a72443d282020dea6d5eb248b528f',
      }
      // eslint-disable-next-line no-unused-vars
      const [data,setData] = useState();
    // eslint-disable-next-line no-unused-vars
      const [slikaTekst,setSlikaTekst]=useState('');
      const [mapa,setMapa] = useState('pressure');
    const lat=JSON.parse(localStorage.getItem("town"))['lat'];
    const lon=JSON.parse(localStorage.getItem("town"))['lon'];
    async function Zagadjenost(latParam,longParam){
       
  
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
     function KvalitetVazduha(){
      let CoParam = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['co'];
      let nh3Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['nh3'];
      let noParam = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['no'];
      let no2Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['no2'];
      let o3Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['o3'];
      let pm2_5Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['pm2_5'];
      let pm10Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['pm10'];
      let so2Param = JSON.parse(localStorage.getItem("polution"))['list']['0']['components']['so2'];
        if(so2Param <= 20 && no2Param <=40 && pm10Param <=20 && pm2_5Param <=10 && o3Param <=60 && CoParam <=4400){
          return "Dobar";
        }
        else if((so2Param >= 20 && so2Param <=80) && (no2Param >= 40 && no2Param <=70) && (pm10Param >= 20 && so2Param <=50) && (pm2_5Param >= 10 && so2Param <=25) && (o3Param >= 60 && o3Param <=100) && (so2Param >= 4400 && so2Param <=9400)){
            return "Solidan";
        }
        else if((so2Param >= 80 && so2Param <=250) && (no2Param >= 70 && no2Param <=150) && (pm10Param >= 50 && so2Param <=100) && (pm2_5Param >= 25 && so2Param <=50) && (o3Param >= 100 && o3Param <=140) && (so2Param >= 9400 && so2Param <=12400)){
          return "Srednji";
      }
      else if((so2Param >= 250 && so2Param <=350) && (no2Param >= 150 && no2Param <=200) && (pm10Param >= 100 && so2Param <=200) && (pm2_5Param >= 50 && so2Param <=75) && (o3Param >= 140 && o3Param <=180) && (so2Param >= 12400 && so2Param <=15400)){
        return "Slab";
    }
    else if(so2Param >= 350 && no2Param >= 200 && pm10Param >= 200 && pm2_5Param >= 75 && o3Param >= 180 && CoParam >= 15400){
      return "Veoma slab";
  }
  else{
    return "ll"
  }
  
     }
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
   
    const position = [51.505, -0.09]
    

    useEffect(()=>{
        fetchData(lat,lon);
        slika(lat,lon);
        Zagadjenost(lat,lon);
        
    },[])
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
            <div className='lista-specifikacija d-flex flex-column  m-auto'>
              <ul className='lista-spec2 d-flex flex-row justify-content-center list-unstyled align-items-center list-none  m-0'>
                  <li className='m-3  '>Danas</li>
                  <li className='m-3  '>Po satima</li>
                  <li className='m-3  '>Dnevno</li>
                  <li className='m-3 '>Radar</li>
                  <li className='m-3 '>Minutecast</li>
                  <li className='m-3 '>Mesecno</li>
               
              </ul>
            
            </div>
            <div className='w-50 m-auto main_Info d-flex flex-column justify-content-between align-items-center mb-5'>
            <div className='d-flex justify-content-between w-75'>
            <div className='d-flex'>
            <img width={69} height={69}  src={"https://openweathermap.org/img/wn/"+slikaTekst+".png"}/>
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
                  <div className='detail_value'>   <p>{KvalitetVazduha()}</p></div>
           
                </div>
                </div>
                </div>
                <div className='detail_value w-75 d-flex flex-column'>   <p className='fw-bold'>{JSON.parse(localStorage.getItem("location_Info"))['list']['0']['weather']['0']['description']}</p>
                 <p>More details <SlArrowRight></SlArrowRight></p></div>
               
            </div>
            <div className='w-50 m-auto map_div d-flex flex-column justify-content-between align-items-start mb-5'>
            <p className='Roboto Condensed fw-bold text-WeatherBlue'>Nis meteorloski radar</p>
            <MapContainer center={position} zoom={3} scrollWheelZoom={false} style={{ height:"400px",width:"100%",backgroundColor:"#528CB7",marginTop:"10px", marginBottom:'10px',borderRadius:"10px"}}>
            <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
      />
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url={`https://tile.openweathermap.org/map/${mapa}/{z}/{x}/{y}.png?&appid=${api.key}`}
    />
 
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  <div className='d-flex justify-content-start align-items-start '>
                  <button className='dugmeMapa' onClick={(e)=>setMapa("pressure")}><img src={pressure} width={"40px"} height={"40px"}/>Pressure</button>
                  <button className='dugmeMapa' onClick={(e)=>setMapa("clouds")}><img src={Clouds} width={"40px"} height={"40px"}/>Clouds</button>
            </div> 
            </div>
          <div className='w-50 m-auto hour_forecast d-flex flex-column justify-content-between align-items-start mb-5'>
          <p className='Roboto Condensed fw-bold text-white'>Nis meteorloski radar</p>
          <div className='hour_forecast_div'>
                <p>pera</p>
                <Carousel responsive={responsive}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
</Carousel>
          </div>
          </div>
            </div>
            
        </>
    )
}
