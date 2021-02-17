/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'w3-css/w3.css';
import { validateEmail } from './Util';
import axios from 'axios';
import md5 from 'md5';
export default (props) => {
   
    const [message, setMessage] = useState({});
    const [email, setEmail] = useState('');

    const onLogin = () => {
    
        setMessage({});
        if (validateEmail(email)) {
            axios.post("http://localhost:50003/api/v1/forget/password",{
            email: email,
            
        }).then((response)=>{
            console.log(response);
        });
        } else {
        
            setMessage({
                message: "Please Enter a valid Email Id!",
                isError: true
            });
        }
    }


    return (
        <div className =" w3-container ">
           
            <hr />
            {
                message && message.message && <span>{message.message}</span>
                
            }
             <span>Please enter your Emaild Id below.</span>
             <form className="form w3-container w3-card-4 w3-center w3-border"style={{width:'450px'}}>
             <h2>Forgot Password?</h2>
                 <div className ="">
                     <label className= "w3-text-blue">Email</label>
                     <input className=  "w3-input w3-border email" type ="email" id="email" placeholder ="*****" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                 </div>
                 <button className ="w3-button w3-blue " type= "button"  onClick={onLogin}>  Request Reset Password</button>
                 <Link to="/login">go back to login</Link>
             </form>
        </div>

   );




}
