import { fromJS, List, Map } from 'immutable';
const initialState = {
  dataTableArea: Map({data:{}, count:1, page:1, per_page:4}),
  error: null
};
export default function area_result(state = fromJS(initialState), action) {
  switch (action.type) {
    case 'GO_GET_DATA_AREA_FETCH':
      return state.set('dataTableArea', action.payload);
    case 'GO_CHANGE_ROW_PERPAGE':
      return state.setIn(['dataTableArea', 'per_page'], action.payload);
      // return state.withMutations((mutableState) => {
      //   mutableState.set('dataTableArea', action.payload);
      // });
    default: return state; // return initial state by default
  }
}