
import { useState } from "react"
import Nav from "../fixed/Nav"
import CitiesList from "./CitiesList"

import NewLocations from "./NewLocations"

import Search from "./Search"
import { MyContext } from "../../MyContext"
export default function Header(){
    const [town,setTown] = useState("Belgrade");
    const [long,setLong]=useState(-111.184535);
    const [lat,setLat]=useState(45.773279);
    const [geo,setGeo]=useState([]);
    return(
        <>
        <header className="header">
            <Nav></Nav>
            <div className="d-flex flex-column align-items-start">
            <MyContext.Provider value={{setGeo,town,setTown,long,setLong,lat,setLat}}>
            <Search></Search>
            </MyContext.Provider>
        
            <NewLocations></NewLocations>
            </div>
            </header>
            <MyContext.Provider value={{setGeo,geo}}>
            <CitiesList town={town} lat={lat} long={long}></CitiesList>
            </MyContext.Provider>
            
        </>
    )
}