
import React, { useEffect, useState } from 'react';
import { Link ,useLocation} from 'react-router-dom';
import 'w3-css/w3.css';
import { validateEmail } from './Util';
import axios from 'axios';
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const query = useQuery();
    const [message, setMessage] = useState({});
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [userId, setUserId] = useState(undefined);
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const [details, setDetails] = useState({
        auth: query.get("authentication"),
        id: query.get("id")
    });
    useEffect(() => {
        const {
            auth, id
        } = details;

        if (auth && id) {

            axios.post("http://localhost:50003/api/v1/reset/password/validate",{
                auth:auth,
                id:id,
        
                }).then((response)=>{
               
                        setUserId(response?.data?.id || "");
                        setMessage({});
                    });
        }
        else{
            
            setMessage({
            message: "wrong credentials",
                    
            });
            return false;
        }
         
            
       
    }, [details]);
    const onResetClick = () => {
        setMessage({});
        
        if(!password || !cPassword) {
            setMessage({
                message: "Please Fill all the fields marked with *",
            });
            return false;
        }

        if (password !== cPassword) {
            setMessage({
                message: "New Password and Confirm Password doesnt match!",
        
            });
            return false;
        }

        if(email) {

            axios.post("http://localhost:50003/api/v1/reset/password",{
                password:password,
                cPassword:cPassword,
                email:email,
                }).then((response)=>{
                    setMessage({
                        message: response.data
                    });
                    });
                   } 
                else{
                        setMessage({
                            message: "Couldn't Identify the user. Try Again!",
                    
                        });
                        return false;
                    }
          
           
        }
    
return (
    <div className =" w3-container ">
        <h2>Reset password</h2>
        <hr />
            {
                message && message.message && <span>{message.message}</span>
                
            }
         <form className="form w3-container w3-card-4 w3-center w3-border"style={{width:'450px'}}>
         <div className ="">
                     <label className= "w3-text-blue">Email</label>
                     <input className=  "email w3-input w3-border" type ="email" id="exampleemail" placeholder ="Email@gmail.com" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                 </div>
             <div className ="">
                 <label className= "w3-text-blue">Password</label>
                 <input className=  "password w3-input w3-border" type ="password" id="password" placeholder ="*****" value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
             </div>
             <div className ="">
                 <label className= "w3-text-blue">Conffirm Password</label>
                 <input className=  " cpassword w3-input w3-border" type ="password" id="cpassword" placeholder ="*******" value={cPassword}
                                    onChange={(e) => setCPassword(e.target.value)}/>
             </div>
             <button className ="w3-button w3-blue " type= "button" onClick= {onResetClick}> Reset Password</button>
             <Link to="/login">Go Back To Login</Link>
         </form>
    </div>

);

};

