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

class FloatingPanel extends React.Component 
{
  state = {expanded: false}

  onToggle = () =>
  {
    this.setState({ expanded: !expanded });
  }

  render() 
  {
    const { classes, openForm, closeForm, children, extraSize, width, editingId, setRef } = this.props;
    const { expanded } = this.state;
    return (
      <div id="divPanelForm" ref={setRef}> 
        <div className={ classNames(classes.formOverlay, openForm && (isWidthDown('sm', width) || expanded) ? classes.showForm : classes.hideForm )}/>
        <section className={ classNames(!openForm ? classes.hideForm : classes.showForm, expanded ? classes.expanded : '', classes.floatingForm, classes.formTheme, extraSize && classes.large )}>
          <header>
            { (editingId === '') ? 'Add New Item' : 'Edit Item' }
            <div className={classes.btnOpt}>
              <Tooltip title={expanded ? 'Exit Full Screen' : 'Full Screen'}>
                <IconButton className={classes.expandButton} onClick={this.onToggle} aria-label="Expand">
                  {expanded ? <MinimizeIcon /> : <ExpandIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Close">
                <IconButton className={classes.closeButton} onClick={() => closeForm()} aria-label="Close">
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

FloatingPanel.defaultProps = {extraSize: false};

const FloatingPanelResponsive = withWidth()(FloatingPanel);
export default withStyles(styles)(FloatingPanelResponsive);
