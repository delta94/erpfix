import { fade } from '@material-ui/core/styles/colorManipulator';
const styles = theme => ({
  flex: {
    flex: 1,
  },
  searchSettings: {
    marginBottom: theme.spacing.unit * 4,
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.background.paper, 0.85) : fade(theme.palette.background.paper, 0.95),
    '& svg': {
      fill: theme.palette.text.secondary
    }
  },
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    borderRadius: 2,
    display: 'block',
  },
  search: {
    width: 'auto',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 4}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: theme.palette.text.primary,
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
  button: {
    display: 'block',
    width: '100%',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    '&:hover': {
      background: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.secondary.light
    },
    '& $icon': {
      margin: '0 auto',
      display: 'block',
      fontSize: 64
    },
    '& $info': {
      display: 'block',
      textTransform: 'none',
      color: theme.palette.grey[500]
    }
  },
  info: {},
  icon: {},
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    marginTop: theme.spacing.unit * -1
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  iconSmall: {
    fontSize: 20,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  detailWrap: {
    paddingTop: theme.spacing.unit * 10
  }
});

export default styles;
