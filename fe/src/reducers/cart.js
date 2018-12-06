const testItems = [
  {
    "product": {
      "_id": "5c07a37f04b3a6f5688ceaa4",
      "image": "https://i.imgur.com/fWIgRG3.png",
      "title": "Test1",
      "body": "<p>Testing testing</p>\n",
      "__v": 0
    },
    "quantity": 4
  },
  {
    "product": {
      "_id": "5c07a39004b3a6f5688ceaa5",
      "title": "Test2",
      "body": "<p>Testing testgin 123</p>\n",
      "__v": 0
    },
    "quantity": 3
  },
  {
    "product": {
      "_id": "5c07a3a104b3a6f5688ceaa6",
      "title": "Test3",
      "body": "<p>Tessting testing 123456</p>\n",
      "__v": 0
    },
    "quantity": 3
  }
]



const initialState = {
  items: testItems,
  count: 0
}



function findAndUpdateItem(items, product){
  console.log(items)
    let itemFound = false
    for (var i =0 ; i < items.length; i++){
      if (items[i].product._id === product._id){
        items[i].quantity += 1
        itemFound = true
      }
    }
    if (!itemFound){
      items.push({product, quantity: 1})
    }
    return items
}

function changeQuantity(items, id, dir){
    for (var i = 0; i < items.length; i++){
        if (items[i]._id === id){
            items[i].quantity = dir === 'increase' ? items[i].quantity + 1 : items[i].quantity -1
        }
    }
    return items
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        count: state.count + 1,
        items: findAndUpdateItem(state.items, action.payload)
      }
    case 'INCREASE_QUANTITY':
      return{
        ...state,
        count: state.count + 1,
        items: changeQuantity(state.items, action.payload, 'increase')
      }
    case 'DECREASE_QUANTITY':
      return{
        ...state,
        count: state.count + 1,
        items: changeQuantity(state.items, action.payload, 'decrease')
      }
    case 'DELETE_ITEM':
      return{
        ...state
      }
    default:
      return state
  }
}
