import React from 'react';
import {BrowserRouter as Router ,Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


import Navbars from './component/layout/Navbars';
import Home from './component/layout/Home';
import CreateAccount from './component/auth/CreateAccount';
import Login from './component/auth/Login';
import ImageUpload from './component/Body/ImageUpload';





const App = () => {
  return (
      <Router>
        <Navbars/>
        
        <Switch>
          <Route exact  path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/createAccount' component={CreateAccount}/>
          <Route exact path='/imageuploader' component={ImageUpload}/>
        </Switch>
      </Router>
      
      
      
  
  )
}

export default App;
