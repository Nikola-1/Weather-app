import { PiArrowRightFill } from "react-icons/pi"
export default function NavigationFooter(){
    return(
        <div className="NavFooter  ">
        <div className="NavFotterWrapper d-flex flex-row justify-content-start align-items-center px-5 text-white w-50 m-auto">
            <p className="px-3">World</p>
            <PiArrowRightFill size={20}></PiArrowRightFill>
            <p className="px-3">Europe</p>
            <PiArrowRightFill size={20}></PiArrowRightFill>
            <p className="px-3">Serbia</p>
            <PiArrowRightFill size={20}></PiArrowRightFill>
            <p className="px-3">Severnobacki okrug</p>
            </div>
        </div>
    )
}