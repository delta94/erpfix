import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import {
  PersonalDashboard, NotFound, F1_Area, F1_Bank, F1_City, F1_Color,
  F1_Branch, F1_Country, F2_CR, F2_CD
} from '../pageListAsync';

class Application extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          { /* Home */ }
          <Route exact path="/fix" component={PersonalDashboard} />
          <Route path="/fix/f1/area" component={F1_Area} />
          <Route path="/fix/f1/bank" component={F1_Bank} />
          <Route path="/fix/f1/branch" component={F1_Branch} />
          <Route path="/fix/f1/city" component={F1_City} />
          <Route path="/fix/f1/color" component={F1_Color} />
          <Route path="/fix/f1/country" component={F1_Country} />
          <Route path="/fix/f2/cr" component={F2_CR} />
          <Route path="/fix/f2/cd" component={F2_CD} />
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Application;
