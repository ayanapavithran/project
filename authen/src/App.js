import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPasswword.';

const App = () => {

  return <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} /> 
      <Route path="/register" component={Register} />
       <Route path="/forgot" component={ForgotPassword} /> 
     <Route path="/reset" component={ResetPassword} /> 

       <Route path="/" component={Login} /> 
    </Switch>
  </BrowserRouter>

}

export default App;