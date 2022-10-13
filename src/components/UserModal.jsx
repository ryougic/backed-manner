import { Button, Modal, Input, Radio, message } from 'antd';
import axios from '../services';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const UserModal = (props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [data,setData] = useState({})
  const onChange1 = (e) => {
    setValue(e.target.value);
    setData({...data,gender:e.target.value})
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (id) => {
    if (props.mode === 1) {
      axios.post('/api/users/add',{...data}).then(res=>{
        if(res.data.errNo === 0){
          message.success('添加成功')
          props.getList(props.page)
        }
        else{
          message.error('添加失败')
        }
      })
      setData(props.data)
    }
    else {
      axios.put('/api/users/'+id,data).then(res=>{
        if(res.data.errNo===0){
          message.success('修改成功')
          props.getList(props.page)
        }
        else{
          message.error('修改失败')
          setData(props.data)
        }
        
      })
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setData(props.data)
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => {
    return {
      showModal,
      handleOk,
      handleCancel
    }
  })
  useEffect(()=>{
    setData(props.data)
  },[JSON.stringify(props.data)])
  return (
    <>
      <Modal
        open={isModalOpen} onOk={()=>handleOk(props.data?.id)} onCancel={handleCancel}
        cancelText='取消'
        okText='确认'
        title={props.mode === 1 ? <h1>添加用户</h1> : <h1>修改用户</h1>}
        key={JSON.stringify(props.data)}
      >
        <div><Input placeholder="用户名" defaultValue={props.data.username} value={data.username} onChange={(e)=>{setData({...data,username:e.target.value})}} /></div>
        <div><Input placeholder="密码"  type='password' defaultValue={null} value={data.password} onChange={(e)=>{setData({...data,password:e.target.value})}} /></div>
        <div><Input placeholder="邮箱" defaultValue={props.data.email} value={data.email} onChange={(e)=>{setData({...data,email:e.target.value})}}  /></div>
        <Radio.Group onChange={onChange1}  value={Number(data.gender)} >
          <Radio value={1}>男</Radio>
          <Radio value={2}>女</Radio>
          <Radio value={3}>保密</Radio>
        </Radio.Group>
        <div><Input placeholder="手机号" defaultValue={props.data.mobile} value={data.mobile} onChange={(e)=>{setData({...data,mobile:e.target.value})}} /></div>
      </Modal>
    </>
  );
};

export default forwardRef(UserModal);