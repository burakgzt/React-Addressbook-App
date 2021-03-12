import React from 'react';
import { Link } from 'react-router-dom';
import {
    Input, Layout, Menu, Row, Col,
} from 'antd';
import ContactList from '../components/ContactList';
import AppData from '../data/AppData';

const { Header } = Layout;
const { Search } = Input;

function HomePage() {
    return (
        <div>
            <Header className="PageHeader">
                <Row>
                    <Col span={12} className="searchContainer">
                        <Search className="searchBar" placeholder="input search text" enterButton="Search" onSearch={(value) => AppData.setSearch(value)} />
                    </Col>
                    <Col span={12}>
                        <Link to="/settings">
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ float: 'right' }}>
                                <Menu.Item key="1">Settings</Menu.Item>
                            </Menu>
                        </Link>
                    </Col>
                </Row>
            </Header>
            <div className="pageContent">
                <ContactList count={50} />
            </div>
        </div>

    );
}

export default HomePage;
