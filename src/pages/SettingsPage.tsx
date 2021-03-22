import React from 'react';
import { Observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import {
    PageHeader, List, Avatar, Button,
} from 'antd';
import AppData from '../data/AppData';

const nationalities = ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IR', 'NO', 'NL', 'NZ', 'TR', 'US'];

function SettingsPage({ history }: any) {
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Settings"
                subTitle="Here you can select a nationality to filter."
            />

            <div className="pageContent">
                <Observer>
                    {() => (

                        <div>
                            <Button type="link" onClick={() => AppData.clearNationalities()} disabled={AppData.nationality.length === 0}>
                                Clear Filters
                            {` (${AppData.nationality.length} selected)`}
                            </Button>
                            <Button type="primary" onClick={() => history.goBack()} disabled={AppData.nationality.length === 0} className="fabButton">
                                Apply Filters
                                {` (${AppData.nationality.length} selected)`}
                            </Button>
                        </div>

                    )}
                </Observer>

                <List
                    itemLayout="horizontal"
                    dataSource={nationalities}
                    renderItem={(item) => (
                        <Observer>
                            {() => (
                                <List.Item
                                    onClick={() => AppData.toggleNationality(item)}
                                    className={AppData.nationality.includes(item) ? 'selectedNat nationalityItem' : 'nationalityItem'}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://www.countryflags.io/${item}/flat/64.png`} className="flagIcon" />}
                                        title={<div className="leftItem">{item}</div>}
                                    />
                                </List.Item>
                            )}
                        </Observer>
                    )}
                />

            </div>
        </div>
    );
}

export default withRouter(SettingsPage);
