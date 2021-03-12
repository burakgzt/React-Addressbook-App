import { makeAutoObservable } from 'mobx';
// import { observer } from 'mobx-react-lite';

class AppData {
    searchStr = '';

    nationality = '';

    constructor() {
        makeAutoObservable(this);
    }

    setSearch(str: string) {
        this.searchStr = str;
    }

    setNationality(str: string) {
        this.nationality = str;
    }
}
export default new AppData();
