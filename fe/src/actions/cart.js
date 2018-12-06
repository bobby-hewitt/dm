export const addItem = (payload) => {
  return dispatch => {
    dispatch({
      type: 'ADD_ITEM',
      payload
    })
  }
}

export const increaseQuantity = (payload) => {
  return dispatch => {
    dispatch({
      type: 'INCREASE_QUANTITY',
      payload
    })
  }
}

export const decreaseQuantity = (payload) => {
  return dispatch => {
    dispatch({
      type: 'DECREASE_QUANTITY',
      payload
    })
  }
}

export const deleteItem = (payload) => {
  return dispatch => {
    dispatch({
      type: 'DELETE_ITEM',
      payload
    })
  }
}