import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import axios from '../services'
function Captcha(props,ref) {
    const [obj,setObj] = useState({
        img:'',
        key:''
    })
    
    function getCaptcha(){
        axios.get('/captcha/api/math').then(res=>{
        setObj(res.data)
        props.setKey(res.data.key)
    })
    }
    useEffect(()=>{
        getCaptcha()
    },[])
    useImperativeHandle(ref,()=>{
        return{
            getCaptcha,
        }
    })
  return (
    <div>
        <img src={obj.img} alt="验证码" />
    </div>
  )
}
export default forwardRef (Captcha)
