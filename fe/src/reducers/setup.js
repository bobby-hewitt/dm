const initialState = {
	authRoute: '/home',
	loader:null,
  redirect:'/home',
  mouseHandler: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
  	 case 'SET_LOADER':
      return {
        ...state,
        loader: action.payload
      }
    case 'SET_REDIRECT':
      return { 
        ...state,
        redirect: action.payload
      }
    case 'SET_MOUSE_HANDLER':
      return {
        ...state,
        mouseHandler: action.payload,
      }
   
    default:
      return state
  }
}
