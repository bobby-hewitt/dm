import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, { TextInput } from 'components/Form'
import Button from 'components/Button'
import Product from 'components/ProductCard'
import Categories from 'components/Categories'

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
		this.props.addItem(product)
	}

	render(){
		return(
			<div>
			<Categories 
				push={this.props.push}
				categories={this.props.categories}/>
			<div className="container">
				
				<div className="row">	
				{this.props.products.map((product, i) => {
					return (
						<div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={i}>
							<Product
								addToCart={this.addToCart.bind(this)}
								onClick={this.onClickProduct.bind(this)} 
								index={i}
								product={product}/>
						</div>
					)
				})}	
				{this.props.products.reverse().map((product, i) => {
					return (
						<div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={i}>
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
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loader: state.setup.loader,
	products: state.product.products,
	categories: state.product.categories
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