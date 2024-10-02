/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/no-unknown-property */

import './App.css'
import AcrossWorld from './components/index/AcrossWorld'
import Info from './components/info/Info.jsx'

import Header from './components/index/Header'
import NavigationFooter from './components/fixed/NavigationFooter'
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom'


// eslint-disable-next-line no-unused-vars

  
 
 
  


function App() {
  
	
 
  return (
    <>
	<Router>
	<Routes>
      <Route path="/" element={<><Header></Header><AcrossWorld></AcrossWorld></>}>
	  
	  </Route>
	  <Route path="/info" element={<Info/>}>
	 
	  </Route>
	  <Route path="/poSatima" element={<Info/>}/>
	  <Route path="/Radar" element={<Info/>}/>
	  </Routes>
	  </Router>
      <NavigationFooter></NavigationFooter>
      <div className="footer-legalese ">
	<div className="footer-copyright text-center p-3">
		<span>
			© 2024 AccuWeather, Inc. „AccuWeather“ i logotip sunca predstavljaju registrovane zaštitne znakove kompanije AccuWeather, Inc. Sva prava zadržana.

		</span>
	</div>
	<div className='TermsUse' >
		<a data-ga="Terms of Use" href="/sr/legal" target="_blank">
			Uslovi korišćenja
		</a>
		|
		<a data-ga="Privacy Policy" href="/sr/privacy" target="_blank">
			Pravila o privatnosti
		</a>
		|
		<a data-ga="Cookie Policy" href="/sr/cookiepolicy" target="_blank">
			Politika kolačića
		</a>
	</div>
</div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js" integrity="sha256-gOQJIa9+K/XdfAuBkg2ONAdw5EnQbokw/s2b8BqsRFg=" crossOrigin="anonymous"></script>
    </>
  )
}

export default App
