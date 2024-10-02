// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import pressure from "../../assets/img/Pressure.png";
import Clouds from "../../assets/img/Clouds.png";

import { MapContainer,Popup,Marker,TileLayer } from 'react-leaflet';

// eslint-disable-next-line react/prop-types
function Mapa({position}) {
    const api={
        key:'bc4f82c3b09a35177e528f73874f69ab',
        key2:'fc2a72443d282020dea6d5eb248b528f',
      }
    const [mapa,setMapa] = useState('pressure');
    let nizVrednosti = [40,20,0,-20,-40];
    let nizVrednosti2 = [950,980,1010,1040,1070];
      function izmenaMape(param){
        setMapa(param);
              if(param == "temp"){
                document.getElementById('color_section').classList.add("sekcija_temp");
                document.getElementById('color_section').classList.remove("sekcija_pressure");
              }
              else if(param == "pressure"){
                document.getElementById('color_section').classList.add("sekcija_pressure");
                document.getElementById('color_section').classList.remove("sekcija_temp");
              }
              else{
                document.getElementById('color_section').classList.remove("sekcija_temp");
                document.getElementById('color_section').classList.remove("sekcija_pressure");
              }
      }
      useEffect(()=>{
        izmenaMape("pressure");
      },[])
  return (
    <div>
    <div className='w-50 m-auto map_div d-flex flex-column justify-content-between align-items-start mb-5'>
              <p className='Roboto Condensed fw-bold text-WeatherBlue'>Nis meteorloski radar</p>
          
              <MapContainer center={position} zoom={6} scrollWheelZoom={false} style={{ height: "400px", width: "100%", backgroundColor: "#528CB7", marginTop: "10px", marginBottom: '10px', borderRadius: "10px" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url={`https://tile.openweathermap.org/map/${mapa}/{z}/{x}/{y}.png?&appid=${api.key}`} />

                <Marker position={position}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>

              </MapContainer>
              <div className='d-flex w-50 sekcija_boje m-auto justify-content-center align-items-center'>
            {mapa=="pressure" ? <p>Pressure:hpa</p> : <></>}
            {mapa=="temp" ? <p>Temperature</p> : <></>}
      <div className="d-flex m-3 " id="color_section" >
        {mapa=="temp" ? nizVrednosti.map((vrednost,index)=><div className='mx-3 d-flex flex-column justify-content-start align-items-center my-2 w-25' key={index}>
        <p>|</p><p>{vrednost}</p>
        </div>) : <></>}
        {mapa=="pressure" ? nizVrednosti2.map((vrednost,index)=><div className='mx-3 d-flex flex-column justify-content-start align-items-center my-2 w-25' key={index}>
            <p>|</p><p>{vrednost}</p>
        </div>) : <></>}
      </div>
      </div>
              <div className='d-flex justify-content-start align-items-start '>
                <button className='dugmeMapa' onClick={(e) => izmenaMape("pressure")}><img src={pressure} width={"40px"} height={"40px"} />Pressure</button>
                <button className='dugmeMapa' onClick={(e) => izmenaMape("clouds")}><img src={Clouds} width={"40px"} height={"40px"} />Clouds</button>
                <button className='dugmeMapa' onClick={(e) => izmenaMape("temp")}><img src={pressure} width={"40px"} height={"40px"} />Temperature</button>
              </div>
            </div>
            
    </div>
  )
}

export default Mapa
