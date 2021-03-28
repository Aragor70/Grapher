import React, { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './interface/auth/Login';
import Register from './interface/auth/Register';




const App = ({ history }) => {

  
  return (
    <Fragment>
      <header className="header-content">
          <h1 onClick={e => history.push('/') }>Grapher</h1>
      </header>
      <main className="output">
        <Switch>
          <Route exact path="/">
            <p>Hi, Please log in.</p>
            <p>
              <p>
                <span onClick={e => history.push('/login') }>log in</span>
              </p>
              <p>
                <span onClick={e => history.push('/register') }>register</span>
              </p>
            </p>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>

        </Switch>
      </main>

    </Fragment>
  );
}

export default withRouter(App);
