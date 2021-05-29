import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../../Page/Home';
import Header from '../Header/Header'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact component={Home} path='/' />
    </BrowserRouter>
  );
}

export default App;
