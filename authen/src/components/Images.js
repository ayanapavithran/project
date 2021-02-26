// import React, { useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import 'w3-css/w3.css';
// import { validateEmail } from './Util';
// import axios from 'axios';
// import md5 from 'md5';
// // eslint-disable-next-line import/no-anonymous-default-export
// export default () => {

//     const [image, setImage] = useState([]);
//     const [message, setMessage] = useState({});
   
//     const onLogin = () => {
//         axios.post("http://localhost:50003/api/v1/gallery",{
            
//         image:image,
//         }).then((response)=>{
//             console.log(response);
//             setMessage({
//                 message: response.data
//             });
            
//         });
//     }


//     return (
//         <div className =" w3-container ">
            
//             <hr />
//             {
//                 message && message.message && <span>{message.message}</span>
                
//             }
//             <form className="form w3-container w3-card-4 w3-center w3-border"style={{width:'450px'}}>
//             <h2>Login</h2>
//                  <div className ="">
//                      <label className= "w3-text-blue">choose image</label>
//                      <input className=  "w3-input w3-border " type ="text" id="image" value={image}
//                             onChange={(e) => setImage(e.target.value)}/>
                            
//                  </div>
                 
//                  <button className ="w3-button w3-blue " type= "button"  onClick={onLogin}> Login</button>
                
//                  <div>
                      
//                   </div>
                  
                 
//              </form>
//         </div>

//    );

    


// };
