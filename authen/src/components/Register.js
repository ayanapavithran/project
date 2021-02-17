/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'w3-css/w3.css';
import { validateEmail } from './Util';
import axios from 'axios';
export default () => {

    const [message, setMessage] = useState({});
    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        cpassword: ''
    });
    const onRegister = () => {
        setMessage({});

        const {
            email, password, fname, lname, cpassword
        } = userData;

        if(!fname || !email || !password || !cpassword) {
            setMessage({
                message: "Please Fill all the fields marked with *",
                isError: true
            });
            return false;
        }

        if(password !== cpassword) {
            setMessage({
                message: "Password and Confirm Password doesnt match!",
                isError: true
            });
            return false;
        }

        if (!validateEmail(email)) {
            setMessage({
                message: "Please Enter a valid Email Id!",
                isError: true
            });
            return false;
        }

        
        axios.post("http://localhost:50003/api/v1/register",{
            fname: fname,
        lname:lname,
        email: email,
        password:password,
        cpassword: cpassword
        }).then((response)=>{
            console.log(response);
            setMessage({
                message: response.data.message
            });
            
        });
    }
    const handleChange = (name, value) => {
        setUserData(data => ({
            ...data,
            [name]: value
        }));
    }
    return (
         <div className =" w3-container ">
            
             <hr />
            {
                message && message.message && <span>{message.message}</span>
                
            }
              <form className="form w3-container w3-card-4 w3-center w3-border"style={{width:'450px'}}>
              <h2>REGISTER</h2>
                  <div className ="">
                      <label className= "w3-text-blue">First Name</label>
                      <input className=  "w3-input w3-border fname" type ="text" id="fname" placeholder ="First Name"  value={userData.fname}
                            onChange={(e) => handleChange("fname", e.target.value)}/>
                  </div>
                  <div className ="">
                      <label className= "w3-text-blue">Last Name</label>
                      <input className=  "w3-input w3-border lname" type ="text" id="lname" placeholder ="lastst Name" value={userData.lname}
                            onChange={(e) => handleChange("lname", e.target.value)}/>
                  </div>
                  <div className ="">
                      <label className= "w3-text-blue">Email</label>
                      <input className=  "w3-input w3-border email" type ="email" id="exampleemail" placeholder ="Email@gmail.com"value={userData.email}
                            onChange={(e) => handleChange("email", e.target.value)}/>
                  </div>
                  <div className ="">
                      <label className= "w3-text-blue">Password</label>
                      <input className=  "w3-input w3-border password" type ="password" id="password" placeholder ="*****"value={userData.password}
                            onChange={(e) => handleChange("password", e.target.value)}/>
                  </div>
                  <div className ="">
                      <label className= "w3-text-blue">Conform Password</label>
                      <input className=  " w3-input w3-border cpassword" type ="password" id="cpassword" placeholder ="*******"value={userData.cpassword}
                            onChange={(e) => handleChange("cpassword", e.target.value)}/>
                  </div>
                  <button className ="w3-button w3-blue " type= "button" onClick={onRegister}> Register</button>
                  <Link to="/login">Go Back To Login</Link>
              </form>
         </div>

    );
    
};
