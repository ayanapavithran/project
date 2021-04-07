import React, { useEffect, useState } from 'react';
import 'w3-css/w3.css';
let intervalCount = 0;
let intervalIncrementor = 1;
const Color = () => {
const [exit, setExit]= useState(false);
const [text, setText] = useState(0);
const [colour, setColour] = useState('');
const [score, setScore] = useState(0);
const colorr = [];
const  colors = ["red","blue","green","yellow"];

 useEffect(() => {
     loadText();
 },[score])

const handleChange = (index) => {
  if(index===text) 
    {
      setScore(score+ 10);
      setExit(false);
      intervalCount=0;
    
    }
    
}
setInterval(()=>{
   intervalCount= intervalCount+intervalIncrementor;
   console.log(intervalCount);
   if(intervalCount>120)
   setExit(true);
   if(score%5===0){
    intervalIncrementor++;
   }
      
  
},2000)


const loadText=()=>{
  let i=text+1;
  if(i>3){
    i=0;
  }
  while(true){
    const randomColour=Math.floor(Math.random() * colors.length);
    if (i!== randomColour && randomColour<4){
       setText(i);
       setColour(randomColour);
       break;
    }
  }
}


  // let i=0;
  // while(i<4){
  //   const randColor=Math.floor(Math.random() * colors.length);
  //   if (colorr.length===4) {
  //       break;
  //     }
  //   if(!colorr.includes(randColor) && randColor<4){
  //      colorr.push(randColor);
  //      i++;
  //   }
    
  // }


  if(exit===true){
    return(
       <div className ="w3-xxlarge w3-center w3-red w3-bold">Game Over!!!!!!!</div>
     );
    } 
    else  
  return (
        <div className="w3-container w3-margin">
             <div className="w3-xlarge"><p>Click the following color</p>
             <div className="w3-center">score :{score}</div>
             </div>
             <div className ="w3-center w3-bold w3-xxlarge" style={{ color:colors[colour] ,width:'30%', height:'120px'}}>
            
             {
              <span >{colors[text]}</span>
            
      
            }</div>
            
             
         <div className="w3-center "style={{ width:'50%', height:'120px'}}>
         {colors.map((val,index) =>     
         
         <button className="w3-xlarge  w3-margin " key={index} value ={val}  onClick={()=>handleChange(index)} style={{backgroundColor:colors[index] ,width:'40%', height:'100px'}}><p></p></button>)}
         
        </div></div>
  );
};

export default Color;