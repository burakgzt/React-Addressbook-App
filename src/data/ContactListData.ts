import { makeAutoObservable } from 'mobx';

import { ListItem } from '../interfaces/ContactListInterface';

class ContactListData {
    temporaryList: ListItem[] = [];

    loading: boolean = false;

    data: ListItem[] = [];

    page: number = 1;

    lastNationality: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    initPage(lastNationality: string) {
        this.lastNationality = lastNationality;
        this.loading = true;
        this.data = new Array<ListItem>();
        this.temporaryList = new Array<ListItem>();
        this.page = 1;
    }

    reloadNationality(lastNationality: string) {
        this.lastNationality = lastNationality;
        this.page = 1;
    }

    initLoading(count: number) {
        const newItems = [...new Array(count)].map(() => ({
            loading: true, name: {}, picture: {}, location: { street: {} }, login: {},
        } as ListItem));
        this.loading = true;
        this.temporaryList = this.data.concat(newItems);
        this.page += 1;
    }

    updateResults(arr: ListItem[]) {
        this.data = arr;
        this.temporaryList = arr;
        this.loading = false;
    }
}
export default new ContactListData();
