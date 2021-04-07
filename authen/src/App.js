import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPasswword.';
import Gallery from './components/Gallery';
import UploadHome from './components/UploadHome';
import LoadImages from './components/LoadImages';
import ViewAlbum from './components/Viewalbum';

const App = () => {

  return <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} /> 
      <Route path="/register" component={Register} />
       <Route path="/forgot" component={ForgotPassword} /> 
     <Route path="/reset" component={ResetPassword} /> 
      <Route path="/gallery" component={LoadImages} />  
     <Route path="/upload" component={UploadHome} /> 
       {/* <Route path="/" component={Login} />  */}
       <Route path="/gallery1" component={Gallery} />
       <Route path="/viewalbum" component={ViewAlbum} /> 
    </Switch>
  </BrowserRouter>


}

export default App;
