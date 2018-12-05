export const addItem = (payload) => {
  return dispatch => {
    dispatch({
      type: 'ADD_ITEM',
      payload
    })
  }
}