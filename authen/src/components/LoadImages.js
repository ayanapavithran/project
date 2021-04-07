import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LoadImages = ({ userId }) => {

    const [images, setImages] = useState([]);
    const [messages, setMessages] = useState({});
    const GET_ALL_IMAGES= "api/v1/images/getAll";
    useEffect(() => {
        if(userId) {
            axios.get(`${GET_ALL_IMAGES}/${userId}`)
            .then(response =>{
                console.log(response);
                if(response.err) {
                    setMessages({
                        message: "Something went wrong!"
                    });
                    setImages([]);
                }else {
                    setImages(response.data.images);
                    console.log(images);
                }
            });
        } else {
            setImages([]);
            setMessages({});
        }
    }, [userId]);
 if(images)
  console.log(images);
    return <>
        <hr/>
        <h1> Image Gallery</h1>
        {
              
                <span>{messages.message}</span>
        
        }
        <div className ="w3-container  ">
        
        {images && images.map((val, idx) => 
        <div className ="w3-padding-small w3-third ">
           
            <div className =" w3-card-4 w3-border">
        <img src ={val.file} key={idx}  alt ="imag"  style={{width:'100%',height:'320px'}}/></div></div>)}   
        </div>
    </>;
};

export default LoadImages;