import { makeAutoObservable } from 'mobx';
// import { observer } from 'mobx-react-lite';

class AppData {
    // Variable to keep searched string after pressing enter
    searchedStr = '';

    // Variable to keep search input value during typing
    searchInputStr = '';

    // nationality filter selection
    nationality: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    // Set search value
    setSearch(str: string): void {
        this.setSearchInput(str);
        this.searchedStr = str;
    }

    // Set input string, used during typing
    setSearchInput(str: string): void {
        this.searchInputStr = str;
    }

    // Reset nationality selection, clear the list
    clearNationalities(): void {
        this.nationality = [];
    }

    // On-off nationality selection
    toggleNationality(str: string): void {
        if (this.nationality.includes(str)) {
            this.nationality = this.nationality.filter((e) => (e !== str));
        } else {
            this.nationality.push(str);
        }
    }

    // Return nationalities as comma seperated string
    getNationalityStr(): string {
        return this.nationality.join();
    }
}
export default new AppData();
