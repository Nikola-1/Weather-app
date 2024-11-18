/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from "react"
import { MyContext } from "../../MyContext"
import { useNavigate } from "react-router-dom"
//import moment from 'moment';
export default function Search() {
   
        const {town,setTown,setLat,setLong,long,lat} = useContext(MyContext)
        const [listTown,setListTown]=useState([]);
        const navigate=useNavigate();
        
        
        function getListOfTowns(city,country){
           if(city != ''){
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=3&appid=dbcdebe95180884276f64dfd197039de`)
            .then(function(response){
              console.log(response)
              return response.json();
            }).then(function(response){
                const filtriranResponse = response.filter((item,index,self)=>index === self.findIndex((t)=> t.name === item.name));
                console.log(filtriranResponse);
               setListTown(filtriranResponse);
               
            })
           }
           else{
            setListTown([]);
           }
         
        }
        function navigateTown(town){
            setTown(town);
           
          
          fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=40&appid=dbcdebe95180884276f64dfd197039de`)
            .then(function(response){
              console.log(response)
              return response.json();
            }).then(function(response){
                localStorage.setItem("town",JSON.stringify(response[0]));
                
                navigate("/info");
            })
        }
        function handleLat(){
            console.log(town)
            // eslint-disable-next-line no-unused-vars
            const town2=fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${town},RS&limit=40&appid=dbcdebe95180884276f64dfd197039de`)
            .then(function(response){
              console.log(response)
                return response.json();
            }).then(function(response){
               console.log(response);
              
                setLat(response[0]['lat']);
                setLong(response[0]['lon']);
                //console.log(response[0]['dt_txt']==moment(new Date()).format('YYYY-MM-DD hh:mm:ii') ? response[0]['temp'] : "none");
                //localStorage.setItem("temperature",response[0]['dt_txt']==moment(new Date()).format('YYYY-MM-DD hh:mm:ii') ? response[0]['temp'] : "none");
                console.log(long);
                console.log(lat);
            });
          
         
        }
       useEffect(()=>{
            handleLat();
         
       },[town])
    return(

        <>
       
            <input type="text" placeholder="Search..." className="pretraga" onKeyDown={(e)=>{if(e.key=="Enter") navigateTown(e.target.value)}} onChange={(e)=>getListOfTowns(e.target.value)} onClick={(e)=>getListOfTowns(e.target.value)}   ></input>
            <ul className={"list-unstyled listSearch  flex-column"}  >
            {listTown != [] && listTown.length !=0 ? listTown.map((item)=><li className="listMember" onClick={()=>{navigateTown(item.name,item.country)}}>{item.name}</li> ) : <p></p>}
            </ul>
           
        </>
    )
}
