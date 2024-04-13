import { useEffect, useRef, useState } from "react";

export function useTypingEffect(texttotype,keyStrokeDurationInMs){
const [currentPostion,setCurrentPostion]=useState(0);
const currentRef=useRef(0);
useEffect(()=>{
const intervalId=setInterval(()=>{
    console.log("hi")
    setCurrentPostion((value)=>value+1)
    currentRef.current+=1;
    if(currentRef.current>texttotype.length){
        clearInterval(intervalId);

    }
},keyStrokeDurationInMs);

return ()=>{
    clearInterval(intervalId);
    currentRef.current=0;
setCurrentPostion(0);
}
},[keyStrokeDurationInMs,texttotype])

return texttotype.substring(0,currentPostion);
}
