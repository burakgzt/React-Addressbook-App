import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

import { AppProps } from './interfaces/AppInterface';

class App extends React.Component {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/settings" component={SettingsPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
