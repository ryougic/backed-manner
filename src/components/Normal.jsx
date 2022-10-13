import React, { useRef, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import '../css/normal.css'
import Captcha from './Captcha';
import axios from '../services';
import { withRouter } from 'react-router';
export default withRouter(Normal)
 function Normal(props) {
    const onFinish = (values) => {
        axios.post('/api/common/auth/login', {
            key,
            captcha: values.verification,
            username:values.username,
            password:values.password
        }).then(res => {
            if(res.data.errNo===0){
                message.success('登录成功')
                localStorage.setItem('jwt',res.data.context.jwt)
                localStorage.setItem('acl',JSON.stringify(res.data.context.acl))
                props.history.push('/dashboard')
            }
            else{
                message.error(res.data.errText)
                cap.current.getCaptcha()
            }
        })
    }
    let cap = useRef()
    const [key, setKey] = useState('')
    return (
        <div id='normalContainer'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
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
                            type="password"
                            placeholder="验证码"
                        />
                        <div style={{ cursor: 'pointer' }} onClick={() => { cap.current.getCaptcha() }}><Captcha ref={cap} setKey={setKey} /></div>

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
