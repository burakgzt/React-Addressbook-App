import React from 'react';

import ContactList from './components/ContactList';

import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="pageColumn">
        <ContactList count={50} />
      </div>
    </div>
  );
}

export default App;
