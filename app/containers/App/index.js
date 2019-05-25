import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import LandingCorporate from './Landing';
import LandingCreative from './LandingCreative';
import ArticleNews from './ArticleNews';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
import { HotKeys } from "react-hotkeys";
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const keyMap = {
  abc1: "ctrl+r",
  abc2: "ctrl+p",
  abc3: "ctrl+o",
  abc4: "ctrl+s",
  abc5: "f5",
  abc6: "ctrl+n",
  abc7: "ctrl+b",
  abc8: "ctrl+t",
  abc9: "ctrl+u",
};

const handlers = {
  abc1: event => event.preventDefault(),
  abc2: event => event.preventDefault(),
  abc3: event => event.preventDefault(),
  abc4: event => event.preventDefault(),
  abc5: event => event.preventDefault(),
  abc6: event => event.preventDefault(),
  abc7: event => event.preventDefault(),
  abc8: event => event.preventDefault(),
  abc9: event => event.preventDefault(),
};

class App extends React.Component {
  render() {
    return (
      <HotKeys keyMap={keyMap} handlers={handlers}>
      <ThemeWrapper>
        <AppContext.Consumer>
          {(changeMode) => (
            <Switch>
              <Route path="/" exact component={LandingCorporate} />
              <Route path="/landing-creative" exact component={LandingCreative} />
              <Route
                path="/fix"
                render={(props) => <Application {...props} changeMode={changeMode} />}
              /> 
              <Route
                path="/blog"
                render={(props) => <ArticleNews {...props} changeMode={changeMode} />}
              />
              <Route component={Auth} />
              <Route component={NotFound} />
            </Switch>
          )}
        </AppContext.Consumer>
      </ThemeWrapper>
      </HotKeys>
    );
  }
}

export default App;
