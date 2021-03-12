import React from 'react';
import { withRouter } from 'react-router-dom';
import { PageHeader, List, Avatar } from 'antd';
import AppData from '../data/AppData';

const nationalities = ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IR', 'NO', 'NL', 'NZ', 'TR', 'US'];

function goBack(history: any, item: string) {
    AppData.setNationality(item);
    history.goBack();
}

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
                <List
                    itemLayout="horizontal"
                    dataSource={nationalities}
                    renderItem={(item) => (
                        <List.Item onClick={() => goBack(history, item)} className="nationalityItem">
                            <List.Item.Meta
                                avatar={<Avatar src={`https://www.countryflags.io/${item}/flat/64.png`} />}
                                title={<div className="leftItem">{item}</div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default withRouter(SettingsPage);
