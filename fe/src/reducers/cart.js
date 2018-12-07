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
  items: [],
  count: 0,
  total: 0,
}

function calculateTotalPrice(items){

  let totalPrice = 0
  for (var i in items){
    console.log(items[i].product.price, parseFloat(items[i].product.price, 10))
    totalPrice += parseFloat(items[i].product.price) * parseInt(items[i].quantity, 10) 
  }
  return Math.floor(totalPrice * 100) / 100
}


function findAndUpdateItem(items, product){
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
    return {
      items,
      total: calculateTotalPrice(items)
    }
}

function changeQuantity(items, id, dir){
    for (var i = 0; i < items.length; i++){
        if (items[i].product._id === id){
            items[i].quantity = dir === 'increase' ? items[i].quantity + 1 : items[i].quantity -1
        }
    }
    return {
      items,
      total: calculateTotalPrice(items)
    }
}

function deleteItem(items, id){
  let count = 0;
  for (var i = 0; i < items.length; i++){
        if (items[i].product._id === id){
          count = items[i].quantity
          items.splice(i ,1)
        }
    }
    return {
      items,
      total: calculateTotalPrice(items),
      count: count
    }
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let newItems0 = findAndUpdateItem(state.items, action.payload)
      return {
        ...state,
        count: state.count + 1,
        items: newItems0.items,
        total: newItems0.total
      }
    case 'INCREASE_QUANTITY':
      let newItems1 = changeQuantity(state.items, action.payload, 'increase')
      return{
        ...state,
        count: state.count - 1,
        items: newItems1.items,
        total: newItems1.total
      }
    case 'DECREASE_QUANTITY':
    let newItems2 = changeQuantity(state.items, action.payload, 'decrease')
      return{
        ...state,
        count: state.count + 1,
        items: newItems2.items,
        total: newItems2.total
      }
    case 'DELETE_ITEM':
      const newItems3 = deleteItem(state.items, action.payload)
      return{
        ...state,
        count: state.count - newItems3.count,
        items: newItems3.items,
        total: newItems3.total
      }
    default:
      return state
  }
}
