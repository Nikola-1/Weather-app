import React from 'react'
import Carousel from 'react-multi-carousel';
import Moment from "react-moment";
// eslint-disable-next-line react/prop-types
function Prognoza3Sata({danasnjiDatum,pocetakDana,krajDana}){
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
      
      
    let prognozaPoSatima=JSON.parse(localStorage.getItem("location_Info"))['list'].filter(prognoza=>{
      const vremePrognoze = prognoza.dt * 1000; // Pretvori Unix timestamp u milisekunde
      return vremePrognoze >= pocetakDana && vremePrognoze < krajDana;
    });

    console.log(prognozaPoSatima);
  return (

      <Carousel responsive={responsive}>
                {prognozaPoSatima.map((prognoza,index)=>   
                 <div key={index} className='d-flex flex-column justify-content-center align-items-center'>
                 <p><Moment date={prognoza.dt_txt} format=" HH:mm "/></p>
                 <img src={"https://openweathermap.org/img/wn/"+prognoza.weather[0].icon+".png"} />
              </div>)}

  
</Carousel>
   
  )
}

export default Prognoza3Sata
