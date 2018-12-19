

const initialState = {
  recipes: [],
  recipe: {
    image: '',
    title: '',
    body: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RECIPE':
      return {
        ...state,
        recipe: action.payload
      }
     case 'SET_RECIPES':
      return {
        ...state,
        recipes: action.payload
      }
    case 'ON_RECIPE_FIELD_CHANGE':
      let newRecipe = Object.assign({}, state.recipe)
      newRecipe[action.payload.field] = action.payload.value
      return {
        ...state,
        recipe: newRecipe
      }
    default:
      return state
  }
}
