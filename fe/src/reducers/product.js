const initialState = {
  products: [],
  product: {
    title: '',
    body: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCT':
      return {
        ...state,
        product: action.payload
      }
     case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      }
    case 'ON_PRODUCT_FIELD_CHANGE':
      let newProduct = Object.assign({}, state.product)
      newProduct[action.payload.field] = action.payload.value
      return {
        ...state,
        product: newProduct
      }
    default:
      return state
  }
}
