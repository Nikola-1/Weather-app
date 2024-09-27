
import logo from "../../assets/img/Logo.png";
import 'bootstrap/dist/css/bootstrap.css';
export default function Nav(){

    return(
       
        <nav className="navigation">
            <div className="d-flex">
            <img src={logo} width={50} height={50}></img>
            <h1>WetherWise</h1>
            </div>
            </nav>
       
    )
}