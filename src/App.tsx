import React from 'react';
import { StartPage } from './components/StartPage/StartPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Identificator } from './components/Idetnificator/Identificator';


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path='/' exact component={StartPage} />
          <Route path='/identificator' component={Identificator} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
