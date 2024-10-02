import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';

function DnevnaPrognoza() {
  const [noviNiz,setNoviNiz]=useState([]);
  useEffect(()=> {
    let nizPrognoza = JSON.parse(localStorage.getItem("location_Info"))['list'];
    let noviNizTemp = []; // Prazan niz za čuvanje odabranih prognoza
    let poslednjiDatum; // Zadržaćemo datum poslednje dodate prognoze
    
    nizPrognoza.forEach((prognoza) => {
      let datum = new Date(prognoza.dt * 1000); // Pretvori timestamp u milisekundama u datum
      let dan = datum.getDate(); // Dobij datum (dan u mesecu)
    
      // Ako je ovo prvi element ili je protekao jedan dan od poslednjeg, dodaj u novi niz
      if (!poslednjiDatum || dan !== poslednjiDatum.getDate()) {
        noviNizTemp.push(prognoza);
        poslednjiDatum = datum; // Ažuriraj poslednji datum
      }
    });
    setNoviNiz(noviNizTemp);
    console.log(noviNiz);
  },[])
  let daniUNedelji = ["Sunday", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    
    
    
  return (
    <div className='w-50 m-auto div_daily_block p-2 my-4'>
<p className='Roboto Condensed fw-bold text-white p-1'>DNEVNA PROGNOZA</p>
    {/* Prikaz rezultata ili nešto drugo */}
    {noviNiz.map((prognoza,index)=> <div key={index} className='text-black daily_forecast d-flex justify-content-between align-items-center p-3'>
            <div className='d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column justify-content-center align-items-center p-3 '>
            <h3 >{new Date(prognoza.dt * 1000).getDay()<= new Date().getDay() ? "Today" : daniUNedelji[new Date(prognoza.dt*1000).getDay()]}</h3>
            <p><Moment date={new Date(prognoza.dt *1000)} format="DD.MM"/></p>
           
            </div>
            <img src={"https://openweathermap.org/img/wn/"+prognoza.weather[0].icon +".png"} width={50} height={50}/>
            <p className='p-1 text-white fw-bold fs-3'>{prognoza.main.temp_max.toFixed(0)}&deg;</p>
            <p className='p-1 text-white'>{prognoza.main.temp_min.toFixed(0)}&deg;</p>
            </div>
           
            <p>2%</p>
    </div>)}
  </div>
  )
}

export default DnevnaPrognoza
