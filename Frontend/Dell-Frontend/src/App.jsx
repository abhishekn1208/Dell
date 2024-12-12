import './App.css'
import {Routes,Route } from 'react-router'
import Cart from './component/Cart/Cart'
import Contact from './component/Contact/Contact'
import Language from './component/language/Language'
import Navbar from './component/Navbar/Navbar'
import Signin from './component/SignIn/Signin'
import Home from './component/Home/Home'
import Signup from './component/Signup/Signup'

function App() {

  return (
    <>
    <Navbar/> 
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='signin' element={ <Signin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='language' element={ <Language/>}/>
    <Route path='cart' element={<Cart/>}/>
    </Routes>

    </>
  )
}

export default App
