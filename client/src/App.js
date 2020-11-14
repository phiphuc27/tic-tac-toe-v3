import { Route, Switch } from 'react-router-dom';

import './App.css';

import Game from './components/Game/';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/game' component={Game} />
      </Switch>
    </>
  );
}

export default App;
