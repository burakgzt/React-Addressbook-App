import React from 'react';
import {
    List, Button, Skeleton, Card, Avatar,
} from 'antd';
import { observer } from 'mobx-react';

import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { UserOutlined } from '@ant-design/icons';
import AppData from '../data/AppData';

const { Meta } = Card;

interface ComponentProps {
    count: number,
    style?: any
}

interface ComponentState {
    list: ListItem[];
    loading: boolean;
    data: ListItem[];
    page: number;
}

interface ListItem {
    loading: boolean;
    name: {
        title: string;
        first: string;
        last: string;
    };
    login: {
        username: string;
        uuid: string;
    },
    email: string;
    nat: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    },
    location: {
        city: string,
        state: string,
        country: string,
        postcode: string,
        coordinates: {
            latitude: number,
            longitude: number
        }
    },
    phone: string,
    cell: string,
    gender: string
}
interface ResponseType {
    results: ListItem[];
}
interface CallbackType { (myArgument: ResponseType): void }

@observer
export default class ContactList extends React.Component<ComponentProps, ComponentState> {
    dataUrl = '';

    constructor(props: any) {
        super(props);

        this.state = {
            loading: true,
            data: new Array<ListItem>(),
            list: new Array<ListItem>(),
            page: 1,
        };
    }

    componentDidMount() {
        this.onLoadMore();
    }

    getData = (callback: CallbackType) => {
        const { count } = this.props;
        const { page } = this.state;
        this.dataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,location,nat,phone,cell,picture,login&page=${page}&seed=burak`;

        axios.get(this.dataUrl)
            .then((res) => {
                callback(res.data);
            });
    };

    onLoadMore = () => {
        const { count } = this.props;
        const newItems = [...new Array(count)].map(() => ({
            loading: true, name: {}, picture: {}, location: {}, login: {},
        } as ListItem));
        const { data, page } = this.state;
        this.setState({
            loading: true,
            list: data.concat(newItems),
            page: page + 1,
        });
        this.getData((res) => {
            const newData = data.concat(res.results);
            this.setState(
                {
                    data: newData,
                    list: newData,
                    loading: false,
                },
                () => {
                    window.dispatchEvent(new Event('resize'));
                },
            );
        });
    };

    filterList = (list: ListItem[]) => list.filter(
        (el) => (
            (!AppData.searchStr)
            || (`${el.name.first} ${el.name.last}`.search(new RegExp(AppData.searchStr, 'i')) > -1)),
    );

    render() {
        const { loading, list, page } = this.state;

        const filteredList = this.filterList(list);
        const hasMore = !loading && page <= 20 && !AppData.searchStr;

        const finishedPage = (!hasMore && page > 20) ? (
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
                <Button onClick={this.onLoadMore}>Load More</Button>
            </div>
        ) : finishedPage;

        return (
            <InfiniteScroll
                initialLoad
                pageStart={0}
                loadMore={this.onLoadMore}
                hasMore={hasMore}
                useWindow
            >
                <h2>
                    {AppData.searchStr}
                </h2>
                {AppData.searchStr && <Button type="link" onClick={() => AppData.setSearch('')}>Clear Search</Button>}
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
                        <List.Item>
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <Card
                                    actions={[
                                        <div>
                                            <UserOutlined style={{ marginRight: 5 }} />
                                            {AppData.searchStr}
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
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        );
    }
}
