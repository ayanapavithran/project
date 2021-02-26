import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'w3-css/w3.css';
import { validateEmail } from './Util';
import axios from 'axios';
import md5 from 'md5';
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const [message, setMessage] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const onLogin = () => {
        if(validateEmail(email)) {
            if(password) {
                axios.post("http://localhost:50001/api/v1/login",{
                  
                email: email,
                password:password,
            
                }).then((response)=>{
                    setMessage({
                        message: response.data.message
                    });
                    
                    if(response.data) {
                        console.log("login success");
                        localStorage.setItem("userDetails", JSON.stringify(response.data.data));
                        console.log(localStorage);
                       
                        props.history.push("upload");
                    }
                });
          
            }
            else{
                     setMessage({
                     message: "Please Enter the Password!",
                }); 
              
            }
        }else{
            setMessage({
                message: "Please Enter a valid Email Id!",
            });
        } 
    }


    return (
        <div className =" w3-container ">
            
            <hr />
            {
                message && message.message && <span>{message.message}</span>
                
            }
            <form className="form w3-container w3-card-4 w3-center w3-border"style={{width:'450px'}}>
            <h2>Login</h2>
                 <div className ="">
                     <label className= "w3-text-blue">Email</label>
                     <input className=  "w3-input w3-border email" type ="email" id="exampleemail" placeholder ="Email@gmail.com" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                 </div>
                 <div className ="">
                     <label className= "w3-text-blue">Passwod</label>
                     <input className=  "w3-input w3-border password" type ="password" id="password" placeholder ="*****"  value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                 </div>
                 <button className ="w3-button w3-blue " type= "button"  onClick={onLogin}> Login</button>
                
                 <Link to="/forgot">Forgot password</Link>
                 <Link to="/home">home</Link>
                 <div>
                      
                  </div>
                  
                 
             </form>
        </div>

   );

    


};
