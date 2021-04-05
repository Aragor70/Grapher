import React, { Fragment, useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './interface/auth/Login';
import Register from './interface/auth/Register';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import setAuthToken from './utils/setAuthToken';
import { loadUser, logout } from './actions/auth';


const App = ({ history }) => {

  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
  });

  const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  const [ user, setUser ] = useState(null);

  
  useEffect(() => {
    
    if (localStorage.token) {

      const checkIn = async() => {
        await setAuthToken(localStorage.token)
        const res = await loadUser(client);

        setUser(res.user || null)
        setIsAuthenticated(res.isAuthenticated || false)
      }
      checkIn()

    } else {
      setUser(null)
      setIsAuthenticated(false)
    }

  }, [loadUser, localStorage.token])
  


  return (
    <Fragment>
      <ApolloProvider client={client}>
        
          <header className="header-content">
              <h1 onClick={e => history.push('/') }>Grapher</h1>
          </header>
          
          <main className="output">
            <Switch>
              <Route exact path="/">

                {
                  isAuthenticated && user ? <Fragment>
                    <p>{user.name}</p>
                    <p>You are logged in</p>

                    <button onClick={e=> logout(history, setUser, setIsAuthenticated)}>log out</button>

                  </Fragment> : <Fragment>

                    <p>
                      <p>
                        <button type="button" onClick={e => history.push('/login') }>log in</button>
                      </p>
                      <p>
                        <button type="button" onClick={e => history.push('/register') }>register</button>
                      </p>
                    </p>

                  </Fragment>
                }
                
              </Route>
              <Route exact path="/login">
                <Login client={client} isAuthenticated={isAuthenticated} />
              </Route>
              <Route exact path="/register">
                <Register client={client} isAuthenticated={isAuthenticated} />
              </Route>

            </Switch>
        </main>
      
      </ApolloProvider>
    </Fragment>
  );
}

export default withRouter(App);
