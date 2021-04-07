import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadImages from './LoadImages';
const Viewalbum = () => {

    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState({});
    const [userId, setUserId] = useState(undefined);
    const GET_ALL_USERS= "api/v1/users/list";
    useEffect(() => {
            axios.get(`${GET_ALL_USERS}`)
            .then(response =>{
                console.log(response.data);
                if(response.err) {
                    setMessages({
                        message: "Something went wrong!"
                    });
                    setUsers([]);
                }else {
                    setUsers(response.data.users);
                    console.log("data user",users);
                }
            });
        
    }, []);

    

    const handleChange = (value) => {
        if(!value) setUserId("");
        if(!isNaN(value)) setUserId(value);
    }
    
 if(users)
  console.log(users);
    return <>
        <hr/>
        <h1> USER DETAILS</h1>
        {
              
                <span>{messages.message}</span>
        
        }
        <div className ="w3-container  ">
        
        {users && users.map((val, idx) => 
        <div key={idx}>
             <label className= "w3-text-blue">Name : {val.fname}</label>
             {/* <label className= "w3-text-blue"onClick={e => handleChange(e.target.value)}>..id : {val.id }</label> */}
             {/* <label className= "w3-text-blue" onClick={e => handleChange(e.target.value)}>id : {val.idx}</label> */}
            <p></p> <button className ="w3-btn w3-round w3-small w3-gray " type= "button" value ={val.id} onClick={e => handleChange(e.target.value)}> view album</button>
        </div>)}   
        <LoadImages userId={userId} />
        </div>
    </>;
};

export default Viewalbum;