
# React Addressbook App

  

Main packages that the project contains

* **react-router-dom** for navigation
* **Ant Design Library** for ui components
* **Mobx** for state management
* **react-infinite-scroller** for infinite scroll feature on addressbook grid

I used Eslint and prettier to validate code style.

## Steps to run

  After clonning to reposistory enter the project directory and run the following codes in order:
  * npm install
  * npm start
  * Open [http://localhost:3000](http://localhost:3000) to view it in the browser (if it doesn't open automatically).

To run tests use:
  * npm test
 
 ## Features

* In home page it will **list of people with page sizes of 50 in a responsive grid**. It will load more when you scroll down.

* You can click on cards to see detailed **location** information of a person.

* You can perform **search** at top navigation bar. Pagination will not work during search (due to API limitations).

* From navigation, you can also open Settings page and select **Nationality** filter. It will update the state and go back to load new data with selected Nationality. (without refreshing the page)