import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import { FETCH_DATA_FORM,ADD_NEW,CLOSE_FORM,SUBMIT_DATA,REMOVE_ROW_FORM,EDIT_ROW_FORM,CLOSE_NOTIF, FETCH_DATA } from '../../actions/actionConstants';
import { mapToObj, initialItem } from '../../service';

const initialState = {dataTable: List([]), formValuesInput: {},
editingId: '', showFrm: false, showFrmFilter: false, notifMsg: '',  count:0, page:1, limit:4, last_page:1, isSubmitting: false,
showSearchField: false, isFocusedField: false, valSearchField: ''};

export default function reducer(state = fromJS(initialState), action = {}) 
{
  if (action.type.indexOf('crudTbFrmDemo') === 0)
  {
    let param = action.type.replace('crudTableForm/', '').replace('crudTbFrmDemo/', '');
    switch (param) 
    {
      case 'SET_SEARCH_GLOBAL':
        return state.withMutations((mutableState) => {
          mutableState
            .set('showSearchField', action.showSearchField)
            .set('isFocusedField', action.isFocusedField)
            .set('isFocusedField', action.isFocusedField);
        });
      case 'SET_DEFAULT':
        return state.withMutations((mutableState) => {
          mutableState
            .set('showFrm', false)
            .set('showFrmFilter', false)
            .set('count', 0)
            .set('page', 1)
            .set('limit', 4)
            .set('last_page', 1)
            .set('data`Table', List([]));
        });
      case `${FETCH_DATA_FORM}`:
        if(action.res.success)
        {
          try{ 
          const { primaryKey } = action;
          let data = action.res.data;
          let no = (data.pagination.currentPage*data.pagination.perPage)-data.pagination.perPage;
          data.data.map((val, i) => {
            data.data[i]['no'] = (i+1+no);
            data.data[i]['id'] = data.data[i][primaryKey];
          });
          return state.withMutations((mutableState) => {
            mutableState.set('count', data.pagination.total);
            mutableState.set('page', data.pagination.currentPage);
            mutableState.set('limit', data.pagination.perPage);
            mutableState.set('last_page', (data.pagination.lastPage==0) ? 1 : data.pagination.lastPage );
            mutableState.set('dataTable', fromJS(data.data));
          });
          }catch(err){
            console.log('err', err)
            return state
          }
        }
        else
        {
          return state.withMutations((mutableState) => 
            {
              mutableState.set('count', 0);
              mutableState.set('page', 1);
              mutableState.set('limit', 4);
              mutableState.set('last_page', 1);
              mutableState.set('dataTable', List([]));
            }
          );
        }
      case `${ADD_NEW}`:
        const raw = state.get('dataTable').last();
        const initial = initialItem(raw, action.anchor);
        return state.withMutations((mutableState) => 
          {
            mutableState
              .set('formValuesInput', initial)
              .set('isSubmitting', false)
              .set('showFrm', !state.get('showFrm'))
              .set('showFrmFilter', false)
              .set('editingId', '');
          }
        );
      case `${ADD_NEW}_FILTER`:
        return state.withMutations((mutableState) => 
        {
          mutableState
          .set('showFrm', false)
          .set('showFrmFilter', !state.get('showFrmFilter'));
        });
      case `SUBMIT_DATA_SAGA`:
        const { editingId } = action;
        return state.withMutations((mutableState) => 
          {
            mutableState
              .set('showFrm', false)
              .set('isSubmitting', false)
              .set('notifMsg', (editingId === '') ? notif.saved : notif.updated)
              .set('formValuesInput', {});
          }
        );
      case `${SUBMIT_DATA}_FILTER_SAGA`:
        return state.withMutations((mutableState) => {
          mutableState.set('showFrmFilter', false);
        });
      case `${CLOSE_FORM}`:
        return state.withMutations((mutableState) => {
          mutableState
            .set('formValuesInput', {})
            .set('showFrm', false);
        });
      case `${CLOSE_FORM}_FILTER`:
        return state.withMutations((mutableState) => {
          mutableState.set('showFrmFilter', false);
        });
      case `${REMOVE_ROW_FORM}_SAGA`:
        return state.withMutations((mutableState) => {
          mutableState.set('notifMsg', notif.removed);
        });
      case `${EDIT_ROW_FORM}`:
        return state.withMutations((mutableState) => {
          mutableState
            .set('formValuesInput', mapToObj(action.item)) 
            .set('isSubmitting', false)
            .set('editingId', action.item.get('id'))
            .set('showFrm', true);
        });
      case `SUBMIT_DATA`:
        return state.withMutations((mutableState) => {
          mutableState.set('isSubmitting', true);
        });
      case `SET_NOTIF`:
        return state.withMutations((mutableState) => {
          mutableState
          .set('isSubmitting', false)
          .set('notifMsg', action.message);
        });
      case `${CLOSE_NOTIF}`:
        return state.withMutations((mutableState) => {
          mutableState.set('notifMsg', '');
        });
    }
  }
  return state;
}