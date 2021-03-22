import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import {
    Input, Layout, Menu, Row, Col,
} from 'antd';
import ContactList from '../components/contact-list/ContactList';
import AppData from '../data/AppData';

import { HomePageProps } from '../interfaces/HomePageInterface';

const { Header } = Layout;
const { Search } = Input;

@observer
class HomePage extends React.Component<HomePageProps> {
    constructor(props: HomePageProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header className="PageHeader">
                    <Row>
                        <Col span={12} className="searchContainer">

                            <Search
                                className="searchBar"
                                placeholder="input search text"
                                enterButton="Search"
                                value={AppData.searchInputStr}
                                onChange={
                                    (event) => AppData.setSearchInput(event.target.value)
                                }
                                onSearch={(value) => AppData.setSearch(value)}
                            />

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
}

export default HomePage;
