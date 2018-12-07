vimport React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, { TextInput } from 'components/Form'
import Button from 'components/Button'
import Product from 'components/ProductCard'

import { setProduct, setProducts } from 'actions/product'
import { addItem } from 'actions/cart'
import './style.scss'

class ItemPage extends Component {
	
	componentWillMount(){
		console.log('location')
		// this.props.loader.get('/product/')
		// .then((data) => {
		// 	console.log(data)
		// 	this.props.setProducts(data)
		// })
		// .catch((err)=> {
		// 	console.log(err)
		// })
	}



	render(){
		return(
			<div className="container">
				<div className="row">	
				
				</div>
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
  addItem,
  setProducts
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPage)