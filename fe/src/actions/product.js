export const setProducts = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_PRODUCTS',
      payload
    })
  }
}

export const setProduct = (payload, callback) => {
  return dispatch => {
    dispatch({
      type: 'SET_PRODUCT',
      payload
    })
    if (callback){
      callback()
    }
  }
}


export const onFieldChange = (payload) => {
  console.log(payload)
  return dispatch => {
    dispatch({
      type: 'ON_PRODUCT_FIELD_CHANGE',
      payload
    })
  }
}
