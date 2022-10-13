import React, { useEffect, useState } from 'react'

import axios from '../services';
import { message } from 'antd';
import Pie from '../components/Pie';
export default function Welcome(props) {
  const [list,setList] = useState({})
  useEffect(() => {
    
    axios.get('/api/users/statistics/getData').then(res=>{
      if(res.data.errNo===0){
        setList(res.data.data)
      }
      else{
        message.error(res.data.errText)
        // props.history.push('/login')
      }
    })
  },[])
  return (
    <div style={{display:'flex',justifyContent:'space-around',overflow:'hidden'}}>
      {
        Object.entries(list).map((item,index)=><Pie data={item[1]} name={item[0]} index={index} key={index}></Pie>)
      }
    </div>
  )
}
