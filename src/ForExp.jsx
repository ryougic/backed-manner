import React, { useState } from 'react'

export default function ForExp() {
    let [time,setTime] = useState(5)
    let [timer,setTimer] = useState(null)
    function timeDown(){
        if(time===0){
            setTime(5)
            console.log('if执行执行')
        }
        else{
            
            setTimeout(()=>{
                time--
                timeDown()
            },1000)
        }
    }
  return (
    <div>
        <button onClick={()=>{timeDown()}}>点击生效</button>
        <button onClick={()=>{clearTimeout(timer)
        console.log(time)
        }}>点击清除</button>
    </div>
  )
}
