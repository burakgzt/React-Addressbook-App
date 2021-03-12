import { makeAutoObservable } from 'mobx';
// import { observer } from 'mobx-react-lite';

class AppData {
    searchStr = '';

    constructor() {
        makeAutoObservable(this);
    }

    setSearch(str: string) {
        this.searchStr = str;
    }
}
export default new AppData();
