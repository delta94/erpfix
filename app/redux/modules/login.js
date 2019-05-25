import { Map, fromJS } from 'immutable';
import { INIT } from '../../actions/actionConstants';

const initialState = {
  usersLogin: Map({
    fixuser: 'erpfix',
    usernamea: 'arrachm4n',
    passworda: 'bismillahhirrohmanirrohim',
    remember: false
  })
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case INIT:
      return state;
    default:
      return state;
  }
}
