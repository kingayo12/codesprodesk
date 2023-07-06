import React, {useState, useEffect} from 'react';
import './Login.css';
import {Link, Outlet, useNavigate} from 'react-router-dom';
// import Logo from '../../../public/codesprologo1.png';
import {FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Lottieanimation from '../../components/Lottieanimation';
import { BsEnvelopeFill } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import axios from 'axios';
const loginURL = 'https://helpdeskserver.up.railway.app/api/auth/login';





const Login = () => {
  const [Email, setEmail] = useState("")
  // const [loading, set_loading] = useState("")
  const [Password, setPassword] = useState("")
  const [pErr, setPErr] = useState("");
  const [E_Err, setEmailError] = useState("")
  const [ErrMsg, setErrMsg] = useState("")
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);




// Toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  // Validate email
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.length <= 0) {
      setEmailError("Please fill out this field.");
      return false;
    } else if (!emailRegExp.test(email)) {
      setEmailError("Invalid email address.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  }
  // allows checked state to be tracked
  useEffect(() => {
    const rememberMeValue = localStorage.getItem("rememberMe");
    setRememberMe(rememberMeValue === "true");
  }, []);
// submit function
    const handleLogin = async (e) => {
      e.preventDefault();
      const data = {
        email: Email,
        password: Password,
      }; 

      if (!validateEmail(Email)) {
        return;
      }
      if (Password.length <= 0) {
        setPErr("Please enter a password");
        return;
      } else if (Password.length < 8) {
        setPErr("Password should be at least 8 characters long");
        return;
      } else {
        setPErr("");
      }
     

      // Making the API call
      try {
        await axios.post(loginURL, data)
         .then(function(response){
           alert(response.status)
           // once successfully navigates to dashboard
           navigate("/&=Dashboard")
           console.log("check response ==>", response);
           // Store "Remember Me" preference
          if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
            // or set a cookie with the rememberMe value
          } else {
            localStorage.removeItem("rememberMe");
            // or remove the rememberMe cookie
          }
         })
        //  .catch(function(error){
        //    console.log("check response ==>", error.response.status);
        //    console.log(error.response.data);
        //    if (error.response?.status === 404){
        //     setErrMsg('invalid email or password');
        //    } else if (error.response?.status === 200){
        //     setErrMsg('rest');
        //    }else if (error.response?.status === 400){
        //     setErrMsg('wrong email or Password');
        //     navigate("/");
        //    }else if (error.response?.status === 401){
        //     setErrMsg('Unauthorized');
        //     navigate("/ ");
        //    }else{
        //     setErrMsg('');
        //    }
        //  })
         .then(function(){
           console.log("check executed ==>" );
         });
       } catch (err) {
        if (err){
          setErrMsg('check internet connectivity')
        }
        if (!err){
          setErrMsg('')
        }

       }
       
  }


  return (
    <>
   
    <div className="login_container">

      <div className="bg2">
        <div className="logo flex justify-center flex-col  w-full items-center py-8">
          <h1 className='text-4xl capitalize font-bold text-white text-left'>Sign In!</h1>
          <h4 className='text-slate-300 text-xs text-left'>Access your account by logging in with your email and password.</h4>
        </div>
        <div className="login_box">
          <div className="err">{ErrMsg}</div>
          <form action="">
          <label htmlFor="Email" className='animate__animated animate__fadeInLeft'>
            <h4>Email</h4>
            <div className="inputs">
            <input
              type="email"
              value={Email}
              onChange = {(e) => setEmail(e.target.value)}
              className='input-w'
              required/>
              <div className="icon">
                <BsEnvelopeFill className='icond'/>
              </div>
            </div>
            <div className="err">{E_Err}</div>
          </label>
          <label htmlFor="Email" className='animate__animated animate__fadeInLeft'>
            <h4>Password</h4>
            <div className="inputs">
            <input
              type={showPassword ? "text" : "password"}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className='input-w'
              required/>
              <div className="icon">
                <MdPassword className='icond'/>
              </div>
              <div className="icon2" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaRegEye className="icond" /> : <FaRegEyeSlash className="icond" />}
                </div>
            </div>
            <div className="err">{pErr}</div>
          </label>
          <label htmlFor="Email" className='flex-check'>
            
            <div className="inputs">
             <input 
             type="checkbox"
             id="rememberMe"
             checked={rememberMe}
             onChange={(e) => setRememberMe(e.target.checked)}
              />
             
            </div>
            <h4>Remember me</h4>
          </label>
          <button className='btn-primary2 btn1 animate__animated animate__fadeInUp' onClick={handleLogin}>Login</button>
          </form>
          <div className="register animate__animated animate__fadeInUp  ">
            <h5> Don't have an account yet?
            <Link to="/Register" className='ck_reg'>Register</Link></h5>
           
          </div>
        </div>
      </div>
      <Outlet/>
      <div className="illustrator">
        <div className="f-design">
        <Lottieanimation/>
        </div>
      </div>

    </div>
  
       </>
       
  )
}

export default Login