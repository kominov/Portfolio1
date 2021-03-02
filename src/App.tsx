import React from 'react';
import { StartPage } from './components/StartPage/StartPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Header } from './components/Header/Header';
import { Draft } from './Draft';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Switch>
          <Route path='/' exact component={StartPage} />
          <Draft />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
