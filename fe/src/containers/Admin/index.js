import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import Products from './Product'
import AddProduct from './Product/EditProduct'
import Recipe from './Recipe'
import AddRecipe from './Recipe/EditRecipe'
import Blog from './Blog'
import AddBlog from './Blog/EditBlog'
import { setRedirect } from 'actions/setup'

class Admin extends Component {

	constructor(props){
		super(props)
	}

	onClick(path){

		this.props.push('/admin' + path)
	}

	componentWillMount(){
		// if (!this.props.user){
		// 	this.props.setRedirect('/admin')
		// 	this.props.push('/auth/login')
		// }
	}



	render(){
			return(
				<div className="Admin">
					<div className="container">
					<Route exact path="/admin/product" component={Products} />
					<Route exact path="/admin/blog" component={Blog} />
					<Route exact path="/admin/recipe" component={Recipe} />
					<Route path="/admin/blog/add" component={AddBlog} />
					<Route path="/admin/recipe/add" component={AddRecipe} />
					<Route path="/admin/blog/edit" render={() => <AddBlog isEdit/>} />
					<Route path="/admin/product/add" component={AddProduct} />
					<Route path="/admin/product/edit" render={() => <AddProduct isEdit/>} />
					<Route path="/admin/recipe/edit" render={() => <AddRecipe isEdit/>} />
					</div>
				</div>

			)
		
	}
}


const mapStateToProps = state => ({
	user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setRedirect,
  push: (path) => push(path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)