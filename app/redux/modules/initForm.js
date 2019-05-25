import { fromJS, Map } from 'immutable';
import { INIT, CLEAR } from '../../actions/actionConstants';

const initialState = {
  formValues: Map()
};
// console.log(`initForm, initialState: ${JSON.stringify(initialState)}`);

const initialImmutableState = fromJS(initialState);
// console.log(`initForm, initialImmutableState: ${initialImmutableState}`);
export default function reducer(state = initialImmutableState, action = {}) 
{
  // console.log(`initForm, state: ${state}`);
  // console.log(`initForm, action: ${JSON.stringify(action)}`);
  switch (action.type) {
    case INIT:
      return state.withMutations((mutableState) => {
        mutableState.set('formValues', action.data);
      });
    case CLEAR:
      return state.withMutations((mutableState) => {
        mutableState.set('formValues', []);
      });
    default:
      return state;
  }
}
