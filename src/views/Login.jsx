import { Card, Tabs } from 'antd';
import React, { useState } from 'react';
import Normal from '../components/Normal';
import Mobile from '../components/Mobile';
import '../css/loginContainer.css'
const onChange = (key) => {
  console.log(key);
};


const Login = () => (
  <div id='loginContainer'>
    <Card
  id='loginContainerCard'
  style={{
    width: 300,
  }}>
  <Tabs
    defaultActiveKey="1"
    onChange={onChange}
    items={[
      {
        label: `密码登录`,
        key: '1',
        children: <Normal />,
      },
      {
        label: `短信登录`,
        key: '2',
        children: <Mobile />,
      }
    ]}
  />
  </Card>
  </div>
);
export default Login;