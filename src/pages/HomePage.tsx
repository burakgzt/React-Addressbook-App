import React from 'react';
import { Observer } from 'mobx-react';
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
                        <Observer>
                            {() => (
                                <Search
                                    className="searchBar"
                                    placeholder="input search text"
                                    enterButton="Search"
                                    value={AppData.searchInputStr}
                                    onChange={(event) => AppData.setSearchInput(event.target.value)}
                                    onSearch={(value) => AppData.setSearch(value)}
                                />
                            )}
                        </Observer>
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
