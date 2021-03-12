import React from 'react';
import {
  Input, Layout, Menu, Row, Col,
} from 'antd';
import ContactList from './components/ContactList';
import './App.scss';
import AppData from './data/AppData';

const { Header } = Layout;
const { Search } = Input;

function App() {
  return (
    <div className="App">
      <Header className="PageHeader">
        <Row>
          <Col span={12} className="searchContainer">
            <Search className="searchBar" placeholder="input search text" enterButton="Search" onSearch={(value) => AppData.setSearch(value)} />
          </Col>
          <Col span={12}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ float: 'right' }}>
              <Menu.Item key="1">Settings</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <div className="pageContent">
        <ContactList count={50} />
      </div>
    </div>
  );
}

export default App;
