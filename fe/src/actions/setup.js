export const setLoader = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_LOADER',
      payload
    })
  }
}

export const setRedirect = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_REDIRECT',
      payload
    })
  }
}
