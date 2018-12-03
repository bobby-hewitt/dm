import React from 'react';
import { Route, Switch } from 'react-router'
import Home from './containers/Home'
import FindAddress from './containers/FindAddress'
import Register from './containers/Register'
import Login from './containers/Login'
import APITest from './containers/APITest'
import PasswordResetRequest from './containers/PasswordResetRequest'
import PasswordReset from './containers/PasswordReset'


const Routes = () => (
  <div>
    <main>
      <div className="container">
        <Route exact path="/" component={Register} />
        
        <Route exact path="/login" component={Login} />
        <Route exact path="/password-reset-request" component={PasswordResetRequest} />
        <Route path="/password-reset" component={PasswordReset} />
        <Route exact path="/test" component={APITest} />
      </div>
    </main>
  </div>
)

export default Routes;