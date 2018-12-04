const initialState = {
  blogs: [],
  blog: {
    title: '',
    body: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOG':
      return {
        ...state,
        blog: action.payload
      }
     case 'SET_BLOGS':
      return {
        ...state,
        blogs: action.payload
      }
    case 'ON_BLOG_FIELD_CHANGE':
      let newBlog = Object.assign({}, state.blog)
      newBlog[action.payload.field] = action.payload.value
      return {
        ...state,
        blog: newBlog
      }
    default:
      return state
  }
}
