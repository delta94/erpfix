import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import {
  PersonalDashboard, CrmDashboard, CryptoDashboard,
  Parent, AppLayout, Responsive, Grid,
  SimpleTable, AdvancedTable, TablePlayground,
  TreeTable, EditableCell,
  ReduxForm, DateTimePicker, CheckboxRadio,
  Switches, Selectbox, Rating,
  SliderRange, Buttons, DialButton,
  ToggleButton, Textbox,
  Autocomplete, Upload, TextEditor,
  Avatars, Accordion, Badges,
  List, PopoverTooltip, Snackbar,
  Typography, Tabs, Cards,
  ImageGrid, Progress, DialogModal,
  Steppers, Paginations, DrawerMenu,
  Breadcrumbs, Icons, IonIcons,
  SliderCarousel, Tags, Dividers,
  LineCharts, BarCharts, AreaCharts,
  PieCharts, RadarCharts, ScatterCharts, CompossedCharts,
  DoughnutCharts, BarDirection, LineScatterChart,
  AreaFilledChart, RadarPolarCharts,
  Contact, Chat, Email, TaskBoard,
  Ecommerce, Timeline, Calendar,
  ProductPage, Invoice, Profile, BlankPage,
  Photos, Pricing, CheckoutPage, Error, Settings,
  HelpSupport, MapMarker, MapDirection, SearchMap,
  TrafficIndicator, StreetViewMap, NotFound, F1_Area, F1_Bank, F1_City, F1_Color,
  F1_Branch, F1_Country
} from '../pageListAsync';

class Application extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          { /* Home */ }
          <Route exact path="/fix" component={PersonalDashboard} />
          <Route path="/fix/crm-dashboard" component={CrmDashboard} />
          <Route path="/fix/crypto-dashboard" component={CryptoDashboard} />
          { /* Sample Page */ }
          <Route path="/fix/f1/area" component={F1_Area} />
          <Route path="/fix/f1/bank" component={F1_Bank} />
          <Route path="/fix/f1/branch" component={F1_Branch} />
          <Route path="/fix/f1/city" component={F1_City} />
          <Route path="/fix/f1/color" component={F1_Color} />
          <Route path="/fix/f1/country" component={F1_Country} />
          { /* Layout */ }
          <Route exact path="/fix/layouts" component={Parent} />
          <Route path="/fix/layouts/grid" component={Grid} />
          <Route path="/fix/layouts/app-layout" component={AppLayout} />
          <Route path="/fix/layouts/responsive" component={Responsive} />
          { /* Table */ }
          <Route exact path="/fix/tables" component={Parent} />
          <Route path="/fix/tables/basic-table" component={SimpleTable} />
          <Route path="/fix/tables/data-table" component={AdvancedTable} />
          <Route path="/fix/tables/table-playground" component={TablePlayground} />
          <Route path="/fix/tables/tree-table" component={TreeTable} />
          <Route path="/fix/tables/editable-cell" component={EditableCell} />
          { /* Form & Button */ }
          <Route exact path="/fix/forms" component={Parent} />
          <Route path="/fix/forms/reduxform" component={ReduxForm} />
          <Route path="/fix/forms/date-time-picker" component={DateTimePicker} />
          <Route path="/fix/forms/checkbox-radio" component={CheckboxRadio} />
          <Route path="/fix/forms/switches" component={Switches} />
          <Route path="/fix/forms/selectbox" component={Selectbox} />
          <Route path="/fix/forms/ratting" component={Rating} />
          <Route path="/fix/forms/slider-range" component={SliderRange} />
          <Route path="/fix/forms/buttons" component={Buttons} />
          <Route path="/fix/forms/toggle-button" component={ToggleButton} />
          <Route path="/fix/forms/dial-button" component={DialButton} />
          <Route path="/fix/forms/textfields" component={Textbox} />
          <Route path="/fix/forms/autocomplete" component={Autocomplete} />
          <Route path="/fix/forms/upload" component={Upload} />
          <Route path="/fix/forms/wysiwyg-editor" component={TextEditor} />
          { /* Ui Components */}
          <Route exact path="/fix/ui" component={Parent} />
          <Route path="/fix/ui/avatars" component={Avatars} />
          <Route path="/fix/ui/accordion" component={Accordion} />
          <Route path="/fix/ui/badges" component={Badges} />
          <Route path="/fix/ui/list" component={List} />
          <Route path="/fix/ui/popover-tooltip" component={PopoverTooltip} />
          <Route path="/fix/ui/snackbar" component={Snackbar} />
          <Route path="/fix/ui/typography" component={Typography} />
          <Route path="/fix/ui/tabs" component={Tabs} />
          <Route path="/fix/ui/card-papper" component={Cards} />
          <Route path="/fix/ui/image-grid" component={ImageGrid} />
          <Route path="/fix/ui/progress" component={Progress} />
          <Route path="/fix/ui/dialog-modal" component={DialogModal} />
          <Route path="/fix/ui/steppers" component={Steppers} />
          <Route path="/fix/ui/paginations" component={Paginations} />
          <Route path="/fix/ui/drawer-menu" component={DrawerMenu} />
          <Route path="/fix/ui/breadcrumbs" component={Breadcrumbs} />
          <Route path="/fix/ui/icons" component={Icons} />
          <Route path="/fix/ui/ionicons" component={IonIcons} />
          <Route path="/fix/ui/slider-carousel" component={SliderCarousel} />
          <Route path="/fix/ui/tags" component={Tags} />
          <Route path="/fix/ui/dividers" component={Dividers} />
          { /* Chart */ }
          <Route exact path="/fix/charts" component={Parent} />
          <Route path="/fix/charts/line-charts" component={LineCharts} />
          <Route path="/fix/charts/bar-charts" component={BarCharts} />
          <Route path="/fix/charts/area-charts" component={AreaCharts} />
          <Route path="/fix/charts/pie-charts" component={PieCharts} />
          <Route path="/fix/charts/radar-charts" component={RadarCharts} />
          <Route path="/fix/charts/scatter-charts" component={ScatterCharts} />
          <Route path="/fix/charts/compossed-chart" component={CompossedCharts} />
          <Route path="/fix/charts/doughnut-pie-charts" component={DoughnutCharts} />
          <Route path="/fix/charts/bar-direction-charts" component={BarDirection} />
          <Route path="/fix/charts/line-scatter-charts" component={LineScatterChart} />
          <Route path="/fix/charts/area-filled-charts" component={AreaFilledChart} />
          <Route path="/fix/charts/radar-polar-chart" component={RadarPolarCharts} />
          { /* Sample Apps */ }
          <Route path="/fix/pages/contact" component={Contact} />
          <Route path="/fix/pages/chat" component={Chat} />
          <Route path="/fix/pages/email" component={Email} />
          <Route path="/fix/pages/timeline" component={Timeline} />
          <Route path="/fix/pages/ecommerce" component={Ecommerce} />
          <Route path="/fix/pages/product-detail" component={ProductPage} />
          <Route path="/fix/pages/checkout" component={CheckoutPage} />
          <Route path="/fix/pages/calendar" component={Calendar} />
          <Route path="/fix/pages/taskboard" component={TaskBoard} />
          <Route path="/fix/pages/invoice" component={Invoice} />
          { /* Pages */ }
          <Route exact path="/fix/pages" component={Parent} />
          <Route path="/fix/pages/user-profile" component={Profile} />
          <Route path="/fix/pages/blank-page" component={BlankPage} />
          <Route path="/fix/pages/photo-gallery" component={Photos} />
          <Route path="/fix/pages/pricing" component={Pricing} />
          <Route path="/fix/pages/not-found" component={NotFound} />
          <Route path="/fix/pages/error" component={Error} />
          <Route path="/fix/pages/settings" component={Settings} />
          <Route path="/fix/pages/help-support" component={HelpSupport} />
          { /* Map */ }
          <Route exact path="/fix/maps" component={Parent} />
          <Route path="/fix/maps/map-marker" component={MapMarker} />
          <Route path="/fix/maps/map-direction" component={MapDirection} />
          <Route path="/fix/maps/map-searchbox" component={SearchMap} />
          <Route path="/fix/maps/map-traffic" component={TrafficIndicator} />
          <Route path="/fix/maps/street-view" component={StreetViewMap} />
          { /* Default */ }
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
