import React, { lazy, Suspense, useState, useEffect } from "react";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));


const generatedClassName = createGenerateClassName({
  productionPrefix: 'co'
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }

  }, [isSignedIn]);

  return (
      <Router history={history}> 
        <StylesProvider generateClassName={generatedClassName}>
          <div className="e">
            <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
            <Suspense fallback={<Progress />}>
              <Switch>
                <Route
                  path="/auth"
                  render={() => (
                    <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                  )}
                />

                <Route
                  path="/dashboard"
                  render={() =>
                    isSignedIn ? <DashboardLazy /> : <Redirect to="/" />
                  }
                />

                <Route
                  exact
                  path="/"
                  component={MarketingLazy}
                />
              </Switch>
            </Suspense>
          </div>
        </StylesProvider>
      </Router>
  );
}