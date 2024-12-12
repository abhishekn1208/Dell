import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import './sign.css'

import FooterLogin from '../Sign-Footer/FooterLogin'
import SignInRight from '../SignInRight/SignInRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Signin = () => {
  const [showPassword, setShowPassword] = useState(true)
  const [error, setError] = useState(null)
  const emailInp = useRef(null)
  const passwordInp = useRef(null)

  const navigate = useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
  const  user = {
      email : emailInp.current.value,
      password : passwordInp.current.value
    }
    try {
      let response = await axios.post("http://localhost:3000/user/login",user)
      console.log(response.data)
      if(response.status===201){
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username",response.data.username)
        alert(response.data.msg)
        navigate("/")
      }
    } catch (error) {
      setError("Invalid Credentials, Please try again")
    }

  }


  return (
    <>
    <div className='sign-main'>
      <div className="sign-content">
        <div className="sign-section1">
          <div className="sign-logo">
          <Link to="/"><img src="https://www.logo.wine/a/logo/Dell_Technologies/Dell_Technologies-Logo.wine.svg" alt="logo" /></Link>
          </div>
         <form id='signin-form' onSubmit={handleSubmit}>
         <div className="sign-box">
            <h3>Sign In</h3>
            <p style={{textAlign:'center', color : "red", fontSize:"16px", marginTop:'10px'}}>{error}</p>
            <div id='socialSignIn'>Google Sign in</div>
            <div id='emailInput'><input type="email" placeholder='Email Address' ref={emailInp}/></div>
            <div style={{position:'relative'}}><input ref={passwordInp} id='eyeInput' type= {showPassword === true? 'password' : 'text'} placeholder='Password'/><FontAwesomeIcon icon={faEye} className='eye' onClick={()=>setShowPassword((prev)=>!prev)} style={{display: showPassword===true ? 'none' : 'block'}}/><FontAwesomeIcon icon={faEyeSlash} className='eye' onClick={()=>setShowPassword((prev)=>!prev)} style={{display: showPassword===false ? 'none' : 'block'}}/></div>
            <p><span>Create or Reset password</span></p>
            <button type='submit'>Sign In</button>

            <div>
              <p>Don't have a Dell account? <span onClick={()=>navigate("/signup")}>Create an account</span></p>
            </div>
            <hr />
            <div style={{marginTop:'20px'}}>
              <p>Need help signing in?<span> View FAQ</span></p>
            </div>
          </div>
         </form>
        </div>
        <div className="sign-section2">
         <SignInRight/>
        </div>
      </div>
      
    </div>
    <FooterLogin/>  

    </>
  )
}

export default Signin
