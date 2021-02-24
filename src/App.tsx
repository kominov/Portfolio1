import React from 'react';
import { StartPage } from './components/StartPage/StartPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Identificator } from './components/Idetnificator/Identificator';
import { Data } from './components/Data/Data';
import { Header } from './components/Header/Header';


function App() {
  return (
    <BrowserRouter>
    <Header />
      <div className="container">
        
        <Switch>
          <Route path='/' exact component={StartPage} />
          <Route path='/identificator' component={Identificator} />
          <Route path='/data' component={Data} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
