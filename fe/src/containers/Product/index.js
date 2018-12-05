import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setProduct } from 'actions/product'

class Product extends Component {

	componentWillMount(){

	}


	render(){
		return(
			<div className="productPageContainer">
				<h3>Title</h3>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loader: state.setup.loader,
	products: state.product.products
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setProduct
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)