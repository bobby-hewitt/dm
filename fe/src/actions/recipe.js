export const setRecipes = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_RECIPES',
      payload
    })
  }
}

export const setRecipe = (payload, callback) => {
  return dispatch => {
    dispatch({
      type: 'SET_RECIPE',
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
      type: 'ON_RECIPE_FIELD_CHANGE',
      payload
    })
  }
}
