import './App.css';
import Register from './Components/Register';
import Login from './Components/Login'
import Home from './Components/Home'
import Table from './Components/Table'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route path="/" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/home" exact component={Home}/>
        <Route path="/table" exact component={Table}/>
      </Switch>
   </Router>
    </div>
  );
}

export default App;
