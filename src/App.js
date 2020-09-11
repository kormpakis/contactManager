import React, {useState} from 'react';
import "antd/dist/antd.css";
import './App.css';
import AddDrawer from "./Drawer";
import {Button, Layout, Table, Menu, Breadcrumb} from "antd";
import {PlusCircleFilled} from '@ant-design/icons'
import {DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import {connect} from 'react-redux';
import {addContact} from "./redux/contacts/actions";

const App = ({contacts, addContact}) => {
  const {Header, Content, Footer, Sider} = Layout;
  const {SubMenu} = Menu;

  const [showDrawer, setShowDrawer] = useState(false)
  // const [values, setValues] = useState([])
  const [errorInfo, setErrorInfo] = useState({})
  const [formValid, setFormValid] = useState(false)

  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  }

  const handleAddFormOnFinish = (data) => {
    // setValues([...values, {
    //   key: values.length + 1, ...data
    // }])
    addContact({
      key: contacts.length + 1, ...data
    })
    setShowDrawer(false)
  }

  const handleAddFormOnFinishFailed = (errorInfo) => {
    setErrorInfo(errorInfo)
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
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
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
              <AddDrawer show={showDrawer} handleOnClose={() => setShowDrawer(false)}
                         handleOnFinish={handleAddFormOnFinish} handleOnFinishFailed={handleAddFormOnFinishFailed}/>
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
    addContact: (contact) => dispatch(addContact(contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
