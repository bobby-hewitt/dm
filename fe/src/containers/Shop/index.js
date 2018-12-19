import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, { TextInput } from 'components/Form'
import Button from 'components/Button'
import Product from 'components/ProductCard'

import { setProduct, setProducts } from 'actions/product'
import { addItem } from 'actions/cart'
import './style.scss'

class Home extends Component {

	componentWillMount(){
		this.props.loader.get('/products')
		.then((data) => {
			console.log(data)
			this.props.setProducts(data)
		})
		.catch((err)=> {
			console.log(err)
		})
	}

	onClickProduct(id){
		this.props.push('/product/' + id)
	}

	addToCart(product){
		// console.log('adding ', id)
		this.props.addItem(product)
	}

	render(){
		return(
			<div className="container">
				<div className="row">	
				{this.props.products.map((product, i) => {
					return (
						<div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12" key={i}>
							<Product
								addToCart={this.addToCart.bind(this)}
								onClick={this.onClickProduct.bind(this)} 
								index={i}
								product={product}/>
						</div>
					)
				})}
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
)(Home)