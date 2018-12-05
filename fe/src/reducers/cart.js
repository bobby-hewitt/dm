const initialState = {
  items: {},
  count: 0
}

const obj = {
  id : {
    product: {

    },
    quantity: 0
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let newItems = Object.assign({}, state.items)
      if (newItems[action.payload._id]){
        newItems[action.payload._id].quantity += 1
      } else {
        newItems[action.payload._id] = {
          product: action.payload,
          quantity: 1
        }
      }
      return {
        ...state,
        count: state.count + 1,
        items: newItems
      }
    default:
      return state
  }
}
