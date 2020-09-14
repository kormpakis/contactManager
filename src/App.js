import React, {useState} from 'react';
import "antd/dist/antd.css";
import './App.css';
import EditContact from "./EditContact";
import {Button, Layout, Table, Menu, Breadcrumb} from "antd";
import {PlusCircleFilled, DeleteOutlined, EditOutlined} from '@ant-design/icons'
import {DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {addContact, deleteContact, editContact} from "./redux/contacts/actions";

const App = ({contacts, addContact, deleteContact, editContact}) => {
  const {Header, Content, Footer, Sider} = Layout;
  const {SubMenu} = Menu;
  const [showDrawer, setShowDrawer] = useState(false)
  const [errorInfo, setErrorInfo] = useState({})
  const [formValid, setFormValid] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [contact, setContact] = useState({firstName: '', lastName: '', phoneNumber: ''})
  const [mode, setMode] = useState('add')
  const [editKey, setEditKey] = useState(null)

  const handleOnClose = () => {
    setShowDrawer(false)
    setContact({firstName: '', lastName: '', phoneNumber: ''})
    setMode('add')
    setEditKey()
  }

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  }

  const handleAddFormOnFinish = data => {
    addContact({
      key: contacts.length + 1, ...data
    })
    setShowDrawer(false)
  }

  const handleEditFormOnFinish = data => {
    editContact({editKey,...data})
    setShowDrawer(false)
  }

  const handleAddFormOnFinishFailed = errorInfo => {
    setErrorInfo(errorInfo)
  }

  const openEditDrawer = (contact, key) => {
    setContact(contact)
    setEditKey(key)
    setMode('edit')
    setShowDrawer(true)
  }

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Delete',
      key: 'action',
      render: (text, contact) => (
        <span>
          <Button onClick={() => deleteContact(contact.key)} type='danger' icon={<DeleteOutlined/>}/>
          <Button onClick={() => openEditDrawer(contact, contact.key)} style={{marginLeft: 5}} icon={<EditOutlined/>}/>
        </span>
      )
    }
  ]

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined/>}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined/>}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined/>}/>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{padding: 0, background: '#fff'}}/>
        <Content className="site-layout-background" style={{margin: '0 16px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Contacts</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
            <React.Fragment>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                <div></div>
                <div>
                  <Button onClick={() => setShowDrawer(true)} type="primary" icon={<PlusCircleFilled/>}
                          data-testid="add-contact-button">
                    Add
                  </Button>
                </div>
              </div>
              <Layout.Content>
                <Table dataSource={contacts} columns={columns}/>
              </Layout.Content>

                <EditContact show={showDrawer} handleOnClose={handleOnClose} mode={mode}
                            handleEditOnFinish={handleEditFormOnFinish}
                            handleOnFinish={handleAddFormOnFinish} handleOnFinishFailed={handleAddFormOnFinishFailed}
                            initialValues={contact}/>
            </React.Fragment>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts && state.contacts.allContacts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addContact: contact => dispatch(addContact(contact)),
    deleteContact: key => dispatch(deleteContact(key)),
    editContact: contact => dispatch(editContact(contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
