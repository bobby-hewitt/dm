import React from 'react';
import { Route, Switch } from 'react-router'
import Home from './containers/Home'
import FindAddress from './containers/FindAddress'
import Register from './containers/Register'
import Login from './containers/Login'
import APITest from './containers/APITest'


const Routes = () => (
  <div>
    <main>
      <div className="container">
        <Route exact path="/" component={Register} />
        
        <Route exact path="/login" component={Login} />
        <Route exact path="/test" component={APITest} />
      </div>
    </main>
  </div>
)

export default Routes;