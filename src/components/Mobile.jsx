import React, { useRef, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import '../css/normal.css'
import Captcha from './Captcha';
import axios from '../services';
import { withRouter } from 'react-router';
export default withRouter(Mobile)
function Mobile(props) {
  const [flag,setFlag] = useState(true)
  const [requestId,setRequestId] = useState()
  let [time,setTime] = useState(5)
  const form = useRef()
  const clickBtn = function changeTime(){
      if(time===0){
        setTime(5)
        setFlag(true)
      }
      else{
        setTimeout(()=>{
          setTime(--time)
          changeTime()
        },1000)
      }
  }
  const send = ()=>{
    form.current.validateFields(['phone',"verification"]).then(res=>{
      console.log(res)
      axios.post('/api/common/captcha/verify',{
        key,
        captcha:res.verification
      }).then(res=>{
        if(res.data.errNo===0){
          message.success('已发送验证🐎')
          setRequestId(1234)
        }
        else{
          message.error(res.data.errText)
        }
      })
    })
  }
  const onFinish = (values) => {
    console.log(values)
    if(requestId===1234&&values.phone==='13940204508'&&values.code==='1234'){
      message.success('登录成功')
      props.history.push('/dashboard')
    }
    else{
      message.error('登录失败')
    }
  }
  let cap = useRef()
  const [key, setKey] = useState('')
  return (
    <div id='normalContainer'>
      <Form
        ref={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              pattern:/^1[3-9]\d{9}$/,
              message: '请输入手机号!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="verification"
          rules={[
            {
              required: true,
              message: 'Please input your verification code!',
            },
          ]}
          style={{ display: 'flex' }}
        >
          <div style={{ display: 'flex' }}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="type"
              placeholder="验证码"
            />
            <div style={{ cursor: 'pointer' }} onClick={() => { cap.current.getCaptcha() }}><Captcha ref={cap} setKey={setKey} /></div>

          </div>
        </Form.Item>
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <div style={{display:'flex'}}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="type"
            placeholder="短信验证码"
          />
          <Button disabled={!flag} onClick={()=>{
            setFlag(false)
            clickBtn()
            send()
          }}
          >{!flag?`${time}秒后可以请求`:'发送验证码'}</Button>
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            style={{ width: '95%', 'marginLeft': '2%' }}
            type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
