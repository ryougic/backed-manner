import { Space, Table, Tag, Button, Pagination, PageHeader } from 'antd';
import axios from '../services';
import React, { useEffect, useRef, useState } from 'react';
import UserModal from '../components/UserModal';

const UserIndex = () => {
  const columns = [
    {
      title: '序号', align: 'center',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名', align: 'center',
      dataIndex: 'username',
      key: 'id',
    },
    {
      title: '手机号', align: 'center',
      dataIndex: 'mobile',
    },
    {
      title: '邮箱', align: 'center',
      dataIndex: 'email',
    },
    {
      title: '性别',
      dataIndex: 'gender', align: 'center',
      render: (gender) => {
        if (gender === '1') {
          return <Tag color="processing" >男</Tag>
        }
        else if (gender === '2') {
          return <Tag color="warning">女</Tag>
        }
        else {
          return < Tag color="success">保密</Tag>
        }
      }
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      render: (status) => {
        if (status === '2') {
          return <Tag color='error'>禁用</Tag>
        }
        else {
          return <Tag color="success">正常</Tag>
        }
      }
    },
    {
      title: '操作', align: 'center',
      key: 'id',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => {
            changeModal(record)
          }}>编辑</Button>
          <Button type="primary">删除</Button>
        </Space>
      ),
    },
  ];
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [tolpage, setTolpage] = useState(1)
  const [mode, setMode] = useState(1)
  const [data, setData] = useState({})
  let mod = useRef()
  function getList(page) {
    axios.get('/api/users?page=' + page).then(res => {
      if (res.data.errNo === 0) {
        setList(res.data.paginate.data)
        setPage(res.data.paginate.current_page)
        setTolpage(res.data.paginate.last_page)
      }
    })
  }
  //  add  mode  =   1   change mode = 2
  function addUser() {
    setMode(1)
    setData({
      username:'',
      email:'',
      gender:1,
      mobile:null,
      password:null
    })
    mod.current.showModal()
  }
  function changeModal(record) {
    setMode(2)
    setData(record)
    mod.current.showModal()
  }
  useEffect(() => {
    getList(1)
  }, [])
  return (
    < div style={{ height: '100%', overflow: 'auto' }}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="用户列表"
        extra={<Button onClick={(a) => {
          addUser()
        }} type='primary'>添加</Button>}
        backIcon={false}
      />
      <Table pagination={false} columns={columns} dataSource={list} rowKey={(item) => item.id} />
      <Pagination showSizeChanger={false} total={tolpage * 10} onChange={(page) => {
        getList(page)
      }} />
      <UserModal ref={mod} mode={mode} data={data}
      getList={getList}
      page={page}
      />
    </div>
  )
};

export default UserIndex;