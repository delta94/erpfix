import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import css from 'dan-styles/Table.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/BorderColor';

class RowReadOnly extends React.Component 
{
  render() 
  {
    const { anchor, classes, item, removeRow, editRow } = this.props;
    const eventDel = () => {removeRow(item)};
    const eventEdit = () => {editRow(item)};
    const renderCell = dataArray => dataArray.map((itemCell, index) => 
    {
      if (itemCell.name !== 'action' && !itemCell.hidden) 
        return (
          <TableCell padding="none" key={index.toString()}>
            {item.get(itemCell.name) !== undefined ? item.get(itemCell.name).toString() : ''}
          </TableCell>
        );
      return false;
    });

    return (
      <tr>
        {renderCell(anchor)}
        <TableCell padding="none">
          <IconButton onClick={() => eventEdit(this)} className={classNames((item.get('edited') ? css.hideAction : ''), classes.button)} aria-label="Edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => eventDel(this)} className={classes.button} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </tr>
    );
  }
}

const styles = theme => ({ button: { margin: theme.spacing.unit } });

export default withStyles(styles)(RowReadOnly);
