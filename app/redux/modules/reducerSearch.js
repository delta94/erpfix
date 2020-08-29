import { fromJS, List } from 'immutable';

const initialState = {dataTable: List([]), title: '',
header: '', notifMsg: '',  count:0, page:1, limit:4, last_page:1};

export default function reducer(state = fromJS(initialState), action = {}) 
{
  if (action.type.indexOf('compSearch') === 0)
  {
    let param = action.type.replace('compSearch/', '');
    switch (param) 
    {
      case `FETCH_DATA_FORM`:
        if(action.res.success)
        {
          let data = action.res.data.data;
          let no = (data.current_page*data.per_page)-data.per_page;
          data.data.map((val, i) => {
            data.data[i]['no'] = (i+1+no);
          });
          return state.withMutations((mutableState) => 
          {
            mutableState.set('title', action.res.data.title);
            mutableState.set('header', action.res.data.header);
            mutableState.set('count', data.total);
            mutableState.set('page', data.current_page);
            mutableState.set('limit', data.per_page);
            mutableState.set('last_page', (data.last_page==0) ? 1 : data.last_page );
            mutableState.set('dataTable', fromJS(data.data));
          });
        }
        else
        {
          return state.withMutations((mutableState) => 
            {
              mutableState.set('title', '');
              mutableState.set('header', '');
              mutableState.set('count', 0);
              mutableState.set('page', 1);
              mutableState.set('limit', 4);
              mutableState.set('last_page', 1);
              mutableState.set('dataTable', List([]));
            }
          );
        }
      case `GET_DATA`:
        return state.withMutations((mutableState) => 
          {
            mutableState.set('txtsearch', action.txtsearch);
            mutableState.set('cmbcolumn', action.cmbcolumn);
            mutableState.set('cmboperator', action.cmboperator);
          }
        );
      case `RESET_DATA_FORM`:
        return state.withMutations((mutableState) => 
          {
            mutableState.set('txtsearch', '');
            mutableState.set('cmbcolumn', '');
            mutableState.set('cmboperator', '');
            mutableState.set('title', '');
            mutableState.set('header', '');
            mutableState.set('count', 0);
            mutableState.set('page', 1);
            mutableState.set('limit', 4);
            mutableState.set('last_page', 1);
            mutableState.set('dataTable', List([]));
          }
        );
    }
  }
  return state;
}