export const setBlogs = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_BLOGS',
      payload
    })
  }
}

export const setBlog = (payload, callback) => {
  return dispatch => {
    dispatch({
      type: 'SET_BLOG',
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
      type: 'ON_BLOG_FIELD_CHANGE',
      payload
    })
  }
}
