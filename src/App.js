import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, message,Button,Modal } from 'antd';
import axios from './services';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, Route,Switch } from 'react-router-dom';
import Welcome from './views/Welcome';
import UserIndex from './views/UserIndex';
import FilmIndex from './views/FilmIndex';
import CinemaIndex from './views/CinemaIndex';
const { Header, Sider, Content } = Layout;

function App(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [flag,setFlag] = useState(false)
  const [username,setUsername] = useState('')
  let navMenus =JSON.parse(localStorage.getItem('acl'))
  let arr = []
  // modal function
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('acl')
    message.info('注销成功',1,()=>{props.history.push('/login')})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //
  navMenus.map(item=>{
    if(item.children.length!==0){
      arr.push({
        key:item.id,
        icon:<UserOutlined />,
        label:item.auth_name,
        children:item.children.filter(item1=>item1.is_nav).map(item2=>({
          key:item2.id,
          label:<Link to={item2.auth_path} >{item2.auth_name}</Link>,
        }))
      })
    }
    else{
      arr.push({
        label:<Link to={item.auth_path} >{item.auth_name}</Link>,
        key:item.id,
        icon:<UserOutlined />
      })
    }
  })
  useEffect(()=>{  //防跳墙
    axios.post('/api/common/auth/jwtPreCheck').then(res=>{
      if(res.data.errNo!==0){
        message.info('请重新登录')
        props.history.push('/login')
      }
      else{
        setFlag(true)
        axios.get('/api/common/auth/adminInfo').then(res=>{
          if(res.data.errNo===0){
            setUsername(res.data.accountInfo.username+'/'+res.data.accountInfo.role)
          }
        })
      }
    })
  },[])
  if(!flag)return null

  return (
    <Layout style={{height:'100%'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={arr}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            style:{color:'white'},
            onClick: () => setCollapsed(!collapsed),
          })}
          <span style={{color:'white',marginLeft:'15px'}}>欢迎{username}</span>
           <Button type="danger" style={{float:'right',margin:'15px 20px 0 0'}} onClick={showModal}>
        注销登录
      </Button>
      <Modal title="提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
        <p>您确定要注销登录嘛？</p>
      </Modal>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path='/dashboard/welcome' component={Welcome} />
            <Route path='/dashboard/user/index' component={UserIndex} />
            <Route path='/dashboard/film/index' component={FilmIndex} />
            <Route path='/dashboard/cinema/index' component={CinemaIndex} />
            <Redirect from='/dashboard' to='/dashboard/welcome' />
          </Switch>
        </Content>
      </Layout>
    </Layout>)
}

export default App;
