import React from 'react';
import { Route, Switch } from 'react-router'
import Home from './containers/Home'
import FindAddress from './containers/FindAddress'
import Register from './containers/Register'


const Routes = () => (
  <div>
    <main>
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route exact path="/lookup" component={Register} />
      </div>
    </main>
  </div>
)

export default Routes;