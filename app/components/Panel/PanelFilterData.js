import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ExpandIcon from '@material-ui/icons/CallMade';
import MinimizeIcon from '@material-ui/icons/CallReceived';
import styles from './panel-jss';

class PanelFilterData extends React.Component {
  state = {
    expanded: false
  }

  toggleExpand() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  render() {
    const { classes, openFormFilter, closeFormFilter, children, extraSize, width, setRef } = this.props;
    const { expanded } = this.state;
    return (
      <div id="divPanelFilterData" ref={setRef}>
        <div className={
          classNames(
            classes.formOverlay,
            openFormFilter && (isWidthDown('sm', width) || expanded) ? classes.showForm : classes.hideForm
          )}
        />
        <section className={
          classNames(
            !openFormFilter ? classes.hideForm : classes.showForm,
            expanded ? classes.expanded : '',
            classes.floatingForm,
            classes.formTheme,
            extraSize && classes.large
          )}
        >
          <header>
            { 'Filter' }
            <div className={classes.btnOpt}>
              <Tooltip title={expanded ? 'Exit Full Screen' : 'Full Screen'}>
                <IconButton className={classes.expandButton} onClick={this.toggleExpand} aria-label="Expand">
                  {expanded ? <MinimizeIcon /> : <ExpandIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Close">
                <IconButton className={classes.closeButton} onClick={closeFormFilter} aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          </header>
          {children}
        </section>
      </div>
    );
  }
}

PanelFilterData.defaultProps = {extraSize: false};

const FloatingPanelResponsive = withWidth()(PanelFilterData);
export default withStyles(styles)(FloatingPanelResponsive);
