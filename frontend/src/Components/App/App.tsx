import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../Page/Home';
import NotFound from '../../Page/NotFound';
import Header from '../Header/Header'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact component={Home} path='/' />

        <Route exact path='/404' component={NotFound} />
        <Redirect from='*' to='/404' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
