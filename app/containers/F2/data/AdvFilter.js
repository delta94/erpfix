
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';

const styles = theme => ({
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      minWidth: 500,
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 40
        }
      }
    }
  }
});

class AdvFilter extends React.Component {
  componentDidMount() {
    console.log(`componentDidMount`);
    this.props.goGetDataArea(1, this.props.dtPerPage);
  }

  render() {
    // console.log(`area_result ${stringify(this.props.area_result)}`);
    // console.log(`dataTableArea ${JSON.stringify(this.props.dataTableArea)}`);
    // console.log(`dtData ${JSON.stringify(this.props.dtData)}`);
    // console.log(`dtCount ${JSON.stringify(this.props.dtCount)}`);
    // console.log(`dtPage ${JSON.stringify(this.props.dtPage)}`);
    const columns = ["Kode", "Nama", "Tanggal", "Aktif"];
    const { classes, dtData, dtCount, dtPage, dtPerPage } = this.props;

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      serverSide: true,
      count: dtCount,
      rowsPerPage: dtPerPage,
      page: dtPage-1,
      rowsPerPageOptions: [4, 8, 12, 16, 20],
      onTableChange: (action, tableState) => {
          switch (action) {
            case "changePage":
              this.props.goGetDataArea(tableState.page+1, dtPerPage);
              break;
          }
      },
      onChangeRowsPerPage: (num) => {
        this.props.goChangeRowsPerPage(num);
      }
    };

    return (
      <div className={classes.table}>
        <MUIDataTable title="DATA LIST" data={dtData} columns={columns} options={options}/>
      </div>
    );
  }
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dtData: state.getIn(['area_result', 'dataTableArea', 'data']),
  dtCount: state.getIn(['area_result', 'dataTableArea', 'count']),
  dtPage: state.getIn(['area_result', 'dataTableArea', 'page']),
  dtPerPage: state.getIn(['area_result', 'dataTableArea', 'per_page']),
  dataTableArea: state.getIn(['area_result', 'dataTableArea']),
  area_result: state.getIn(['area_result']),
});

const mapDispatchToProps = (dispatch) => {
  return {
    goGetDataArea: (page, per_page) => dispatch({type:'GO_GET_DATA_AREA', payload:{page:page, per_page:per_page}}),
    goChangeRowsPerPage: (num) => dispatch({type:'GO_CHANGE_ROW_PERPAGE', payload:num})
  }
}

const AdvFilterConn = connect(mapStateToProps,mapDispatchToProps)(AdvFilter);

export default withStyles(styles)(AdvFilterConn);