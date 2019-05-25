import React from 'react';
import { createUltimatePagination, ITEM_TYPES } from 'react-ultimate-pagination';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import NavigationFirstPage from '@material-ui/icons/FirstPage';
import NavigationLastPage from '@material-ui/icons/LastPage';
import NavigationChevronLeft from '@material-ui/icons/ChevronLeft';
import NavigationChevronRight from '@material-ui/icons/ChevronRight';

const flatButtonStyle = {
  minWidth: 36
};

const styles = {
  paging: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const Page = ({
  value,
  isActive,
  onClick,
  isDisabled
}) => (
  <Button
    style={flatButtonStyle}
    color={isActive ? 'primary' : 'default'}
    onClick={onClick}
    disabled={isDisabled}
  >
    {value.toString()}
  </Button>
);

const Ellipsis = ({ onClick, isDisabled }) => (
  <Button
    style={flatButtonStyle}
    onClick={onClick}
    disabled={isDisabled}
  >
    ...
  </Button>
);

const FirstPageLink = ({ onClick, isDisabled }) => (
  <IconButton
    style={flatButtonStyle}
    onClick={onClick}
    disabled={isDisabled}
  >
    <NavigationFirstPage />
  </IconButton>
);

const PreviousPageLink = ({ onClick, isDisabled }) => (
  <IconButton
    style={flatButtonStyle}
    onClick={onClick}
    disabled={isDisabled}
  >
    <NavigationChevronLeft />
  </IconButton>
);

const NextPageLink = ({ onClick, isDisabled }) => (
  <IconButton
    style={flatButtonStyle}
    onClick={onClick}
    disabled={isDisabled}
  >
    <NavigationChevronRight />
  </IconButton>
);

const LastPageLink = ({ onClick, isDisabled }) => (
  <IconButton
    style={flatButtonStyle}
    onClick={onClick}
    disabled={isDisabled}
  >
    <NavigationLastPage />
  </IconButton>
);


const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink
};

const UltmPagination = createUltimatePagination({ itemTypeToComponent });

class Pagination extends React.Component {
  render() 
  {
    const hide = true;
    const {
      classes,
      curpage,
      onChange,
      totpages,
      ...rest
    } = this.props;
    return (
      <div className={classes.paging}>
        <FirstPageLink isDisabled={curpage <= 1} onClick={() => onChange(1)} />
        <PreviousPageLink isDisabled={curpage <= 1} onClick={() => onChange(curpage-1)} />
        <Hidden xsDown>
          <UltmPagination
            currentPage={curpage}
            totalPages={totpages}
            onChange={onChange}
            hidePreviousAndNextPageLinks={hide}
            hideFirstAndLastPageLinks={hide}
            {...rest}
          />
        </Hidden>
        <NextPageLink isDisabled={curpage >= totpages} onClick={() => onChange(curpage+1)} />
        <LastPageLink isDisabled={curpage >= totpages} onClick={() => onChange(totpages)} />
      </div>
    );
  }
}

export default withStyles(styles)(Pagination);
