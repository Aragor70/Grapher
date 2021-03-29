import React, { Fragment, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './interface/auth/Login';
import Register from './interface/auth/Register';
import { gql } from '@apollo/client';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';


const App = ({ history }) => {

  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
  });
  
  useEffect(() => {
    
    client
    .query({
      query: gql`
        query RootQueryType {
          user(id: "1") {
            id,
            name,
            email,
            password
          }
        }
      `
    })
    .then(result => console.log(result));


  }, [])
  


  return (
    <Fragment>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </Fragment>
  );
}

export default withRouter(App);
