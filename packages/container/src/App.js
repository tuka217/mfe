import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));


const generatedClassName = createGenerateClassName({
  productionPrefix: 'co'
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
      <BrowserRouter> 
        <StylesProvider generateClassName={generatedClassName}>
          <div className="e">
            <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
            <Suspense fallback={<Progress />}>
              <Switch>
                <Route path="/auth"> 
                  <AuthLazy onSignIn={ () => setIsSignedIn(true)}/>
                </Route>
                <Route path="/" component={MarketingLazy} />
              </Switch>
            </Suspense>
          </div>
        </StylesProvider>
      </BrowserRouter>
  );
}