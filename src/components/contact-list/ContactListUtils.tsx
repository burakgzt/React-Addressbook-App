import axios from 'axios';

import { ListItem, CallbackType } from '../../interfaces/ContactListInterface';
import AppData from '../../data/AppData';
import ContactListData from '../../data/ContactListData';

const getData = (count: number, callback: CallbackType) => {
    const nat = AppData.getNationalityStr();

    // If nationality is changed. Reload the page
    if (nat !== ContactListData.lastNationality) {
        ContactListData.reloadNationality(nat);
        getData(count, callback);
        return;
    }

    const dataUrl = `https://randomuser.me/api/?results=${count}&nat=${nat}&inc=name,gender,email,location,nat,phone,cell,picture,login&page=${ContactListData.page}&seed=burak`;

    axios.get(dataUrl).then((res) => {
        callback(res.data);
    });
};

const onLoadMore = (count: number) => {
    ContactListData.initLoading(count);

    getData(count, (res) => {
        const newData = ContactListData.data.concat(res.results);
        ContactListData.updateResults(newData);
    });
};

const filterList = (list: ListItem[]) => list.filter(
    (el) => (
        (!AppData.searchedStr)
        || (`${el.name.first} ${el.name.last}`.search(new RegExp(AppData.searchedStr, 'i')) > -1)),
);

const hasMoreRecord: (() => boolean) = () => (!ContactListData.loading
    && ContactListData.page <= 20
    && !AppData.searchedStr);

export { filterList, onLoadMore, hasMoreRecord };
