import React from 'react';
import {
    List, Button, Skeleton, Card, Avatar, Popover,
} from 'antd';
import { observer } from 'mobx-react';

import InfiniteScroll from 'react-infinite-scroller';
import { UserOutlined } from '@ant-design/icons';
import AppData from '../../data/AppData';
import ContactListData from '../../data/ContactListData';

import { onLoadMore, filterList, hasMoreRecord } from './ContactListUtils';
import {
    ComponentProps, ComponentState, ListItem,
} from '../../interfaces/ContactListInterface';

const { Meta } = Card;

@observer
export default class ContactList extends React.Component<ComponentProps, ComponentState> {
    dataUrl = '';

    constructor(props: ComponentProps) {
        super(props);

        ContactListData.initPage(AppData.getNationalityStr());
    }

    componentDidMount() {
        const { count } = this.props;
        onLoadMore(count);
    }

    render() {
        const { count } = this.props;

        const hasMore: boolean = hasMoreRecord();
        const filteredList = filterList(ContactListData.temporaryList);

        const finishedPage = (!hasMore && ContactListData.page > 20) ? (
            <p className="pdbottom">
                End of users catalog
            </p>
        ) : null;
        const loadMore = hasMore ? (
            <div style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
            >
                <Button onClick={() => onLoadMore(count)}>Load More</Button>
            </div>
        ) : finishedPage;

        return (
            <InfiniteScroll
                initialLoad
                pageStart={0}
                loadMore={() => onLoadMore(count)}
                hasMore={hasMore}
                useWindow
            >
                <h2>
                    {AppData.searchedStr}
                </h2>
                {AppData.searchedStr && <Button type="link" onClick={() => AppData.setSearch('')}>Clear Search</Button>}
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 3,
                        xl: 4,
                        xxl: 5,
                    }}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={filteredList}
                    renderItem={(item: ListItem) => (
                        <List.Item className="listItem">
                            <Popover
                                content={(
                                    <ul>
                                        <li>
                                            <b>Country: </b>
                                            {item.location.country}
                                        </li>
                                        <li>
                                            <b>City: </b>
                                            {item.location.city}
                                        </li>
                                        <li>
                                            <b>State: </b>
                                            {item.location.state}
                                        </li>
                                        <li>
                                            <b>Street: </b>
                                            {`${item.location.street.number} - ${item.location.street.name}`}
                                        </li>
                                        <li>
                                            <b>Post code: </b>
                                            {item.location.postcode}
                                        </li>
                                        <li>
                                            <b>Phone: </b>
                                            {item.phone}
                                        </li>
                                        <li>
                                            <b>Cell: </b>
                                            {item.cell}
                                        </li>
                                    </ul>
                                )}
                                title="Location Info"
                                trigger="click"
                                visible={item.popoverVisible}
                            >
                                <a href="#/">
                                    <Skeleton avatar title={false} loading={item.loading} active>
                                        <Card
                                            actions={[
                                                <div>
                                                    <UserOutlined style={{ marginRight: 5 }} />
                                                    {AppData.searchedStr}
                                                    {item.login.username}
                                                </div>,
                                            ]}
                                        >
                                            <Meta
                                                avatar={<Avatar src={item.picture.thumbnail} />}
                                                title={`${item.name.title}. ${item.name.first} ${item.name.last}`}
                                                description={item.email}
                                            />
                                        </Card>
                                    </Skeleton>
                                </a>
                            </Popover>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        );
    }
}
