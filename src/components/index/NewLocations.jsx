import sun from "../../assets/img/sun.png";
export default function NewLocations(){

    return(
       
       <div className="NewLocationBox">
        <h3>Belgrade</h3>
        <p className="NewLocationCountry">Serbia</p>
        <div className="TemperatureWrapper">
            <img src={sun} width={40} height={40}/>
            <span className="temperature">36°</span>
        </div>
       </div>
    
    )
}