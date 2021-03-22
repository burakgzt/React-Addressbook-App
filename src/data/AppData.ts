import { makeAutoObservable } from 'mobx';
// import { observer } from 'mobx-react-lite';

class AppData {
    // Variable to keep searched string after pressing enter
    searchedStr = '';

    // Variable to keep search input value during typing
    searchInputStr = '';

    // nationality filter selection
    nationality = '';

    constructor() {
        makeAutoObservable(this);
    }

    setSearch(str: string) {
        this.setSearchInput(str);
        this.searchedStr = str;
    }

    setSearchInput(str: string) {
        this.searchInputStr = str;
    }

    setNationality(str: string) {
        this.nationality = str;
    }
}
export default new AppData();
