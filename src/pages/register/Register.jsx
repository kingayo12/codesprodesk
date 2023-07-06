import React,{useState} from 'react';
import './Register.css';
import {Link, Outlet, useNavigate} from 'react-router-dom';
// import Logo from '../../assets/logo/codesprologo1.png';
import { BsEnvelopeFill } from "react-icons/bs";
import { FaUserAlt, FaUserCircle, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdPassword, MdVpnKey } from "react-icons/md"
import axios from "axios";



const registerURL = 'https://helpdeskserver.up.railway.app/api/auth/register';


export const Register = () => {
  const [IsError, setIsError] = useState("")
  const [IsC_err, setIsC_err] = useState("")
  const [IsL_Error, setIsL_Error] = useState("")
  const [IsF_Error, setIsF_Error] = useState("")
  const [ErrMsg, setErrMsg] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [EmailError, setEmailError] = useState('')
  const [F_name, setF_name] = useState('')
  const [L_name, setL_name] = useState('')
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the visibility of the password
  };


  const validateFirstName = (firstName) => {
  if (firstName.length <= 0) {
    setIsF_Error("Please fill out this field.");
    return false;
  } else if (firstName.length <= 3) {
    setIsF_Error("First name should be at least 4 characters long.");
    return false;
  } else {
    setIsF_Error("");
    return true;
  }
};

const validateLastName = (lastName) => {
  if (lastName.length <= 0) {
    setIsL_Error("Please fill out this field.");
    return false;
  } else if (lastName.length <= 3) {
    setIsL_Error("Last name should be at least 4 characters long.");
    return false;
  } else {
    setIsL_Error("");
    return true;
  }
};



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
};

const validatePassword = (password, confirmPassword) => {
  if (password.length <= 0) {
    setIsError('Please fill out this field.');
    return false;
  } else if (password.length <= 7) {
    setIsError('Password should be at least 8 characters long.');
    return false;
  } else if (password !== confirmPassword) {
    setIsC_err('Passwords do not match.');
    return false;
  } else if (!/[A-Z]/.test(password)) {
    setIsError('Password should contain at least one uppercase letter.');
    return false;
  } else if (!/[a-z]/.test(password)) {
    setIsError('Password should contain at least one lowercase letter.');
    return false;
  } else if (!/\d/.test(password)) {
    setIsError('Password should contain at least one digit.');
    return false;
  } else if (!/[!@#$%^&*]/.test(password)) {
    setIsError('Password should contain at least one special character (!@#$%^&*).');
    return false;
  } else {
    setIsError('');
    setIsC_err('');
    return true;
  }
};
  


const onRegister = async (e) =>{
    e.preventDefault()
    // --------------------------------------name validation-------------------------------------------------------------------------------------------------

    if (!validateFirstName(F_name)) {
    return;
  }
    // -----------------------------Lastname validation----------------------------------------------------------------------------------------------------------
  
    if (!validateLastName(L_name)) {
    return;
  }
    // -----------------------------Email validation----------------------------------------------------------------------------------------------------------------
  
    if (!validateEmail(Email)) {
    return;
  }
    // -----------------------------password ||confimpassword validation--------------------------------------

  if (!validatePassword(Password, confirmPassword)) {
    return;
  }

  // ------------------------------------------------------------data Calling--------------------------------------
    const data = {
      name:`${F_name + " " + L_name}`,
      email: Email,
      password: Password,
    };
    try {
        await axios.post(registerURL, data)
        .then(function(response){
          console.log(response.status)
          navigate("/&=ConfirmMail")
          console.log("check response ==>", response);
        })
        .catch(function(error){
          console.log("check response ==>", error);
          if (error.status === 500){
            setErrMsg('confirm email');
            console.log(ErrMsg);
          }else if (error.response?.status === 200){
            // setErrMsg('Login');console.log("check response ==>", error.response.message);
          }else if (error.response.status === 400){
            setErrMsg(error.response.statusText);
          console.log("check response ==>", error.response.message);

          }else if (error.response.status === 500){
            setErrMsg('Email already exist!!');
          console.log("check response ==>", error.response.message);
          }
        })
        .then(function(){
          console.log("check executed ==>");
        });
      } catch (err) {
        if (!err.response){
          setErrMsg('Register failed')
        }else{
          setErrMsg('')
        }

      } 

      console.log(data)

  }   

  return (
    <>
    <div className="reg_container">
    <div className="illustrator2"></div>

      <div className="bg">
      <div className="logo flex justify-center flex-col  w-full items-center py-8">
          <h1 className='text-4xl capitalize font-bold text-white text-left'>Hi There!</h1>
          <h4 className='text-slate-300 text-xs text-left'>Create a new account to get started.</h4>
        </div>
        <div className="reg_text">
          <h1>Register</h1>
        </div>
        <div className="reg_box">
        <div className="err">{ErrMsg} </div>
          <form action="">
          <label htmlFor="Name" className='animate__animated animate__backInRight' id='bordererr'>
            <h4>FirstName</h4>
            <div className="inputs">
              <input type="text"
              value={F_name}
              onChange = {(e) => setF_name(e.target.value)}
              className='input-w'
              required/>
              <div className="icon">
                <FaUserAlt className='icond'/>
              </div>
            </div>
        <div className="err">{IsF_Error} </div>

          </label>
          <label htmlFor="Company" className='animate__animated animate__backInRight'>
            <h4>LastName</h4>
            <div className="inputs">
            <input type="text"
              value={L_name}
              onChange = {(e) => setL_name(e.target.value)}
              className='input-w'
              required/>
              <div className="icon">
                <FaUserCircle className='icond'/>
              </div>
            </div>
        <div className="err">{IsL_Error} </div>

          </label>
          <label htmlFor="Email" className='animate__animated animate__backInRight'>
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
            <div className="err">{EmailError} </div>
          </label>
          
            <div className="pass-inputs">
            <label htmlFor="Password" className='animate__animated animate__backInRight'>
            <h4>Password</h4>
            <div className="inputs">
              <input
              type={showPassword ? 'text' : 'password'}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className='input-w'
              required/>
              <div className="icon">
                <MdVpnKey className='icond'/>
              </div>
              <div className="icon2" onClick={togglePasswordVisibility}>
                  {showPassword ?  <FaRegEye className="icond" /> : <FaRegEyeSlash className="icond" />}
                </div>
            </div>
            <div className="err">{IsError} </div>

            </label>
            <label htmlFor="confirm_password" className='animate__animated animate__backInRight'>
            <h4>Confirm password</h4>
            <div className="inputs">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              // onChange={(e) => checkValidation(e)}
              className='input-w'
              required/>
              <div className="icon">
                <MdPassword className='icond'/>
              </div>
            </div>
            <div className="err">{IsC_err} </div>
          </label>
            </div>
          <button className='btn-primary btn1 animate__animated animate__bounceInUp'onClick={onRegister}>Register</button>
          </form>
          <div className="register animate__animated animate__bounceInUp">
            <h5>Already have an account?
            <Link to="/" className='ck_reg'>Login</Link></h5>
          </div>
        </div>
        <Outlet/>
      </div>
      {/* <div className="illustrator2"></div> */}

    </div>
       </>
       
  )
}

export default Register