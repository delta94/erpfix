import * as types from './actionConstants';
export const fetchAction = (items, branch) => ({branch,type: `${branch}/${types.FETCH_DATA}`,items});
export const addAction = (anchor, branch) => ({branch,type: `${branch}/${types.ADD_NEW}`,anchor});
export const addActionFilter = (anchor, branch) => ({branch,type: `${branch}/${types.ADD_NEW}_FILTER`,anchor});
export const closeAction = branch => ({branch,type: `${branch}/${types.CLOSE_FORM}`});
export const closeActionFilter = branch => ({branch,type: `${branch}/${types.CLOSE_FORM}_FILTER`});
export const submitAction = (newData, branch, editingId, source, primaryKey) => ({branch,type: `${branch}/${types.SUBMIT_DATA}`,newData, editingId, source, primaryKey});
export const removeAction = (item, branch, pagging, source, primaryKey) => ({branch,type: `${branch}/${types.REMOVE_ROW_FORM}`,item , pagging, source, primaryKey});
export const editAction = (item, branch) => ({branch,type: `${branch}/${types.EDIT_ROW_FORM}`,item});
export const closeNotifAction = branch => ({branch,type: `${branch}/${types.CLOSE_NOTIF}`,});
