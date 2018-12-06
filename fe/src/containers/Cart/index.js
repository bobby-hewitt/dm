import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, { TextInput } from 'components/Form'
import Button from 'components/Button'
import CartItem from 'components/CartItem'

import { setProduct, setProducts } from 'actions/product'
import { addItem } from 'actions/cart'
import './style.scss'

class Cart extends Component {

	componentWillMount(){
		console.log(this.props.cart)
		let keys = Object.keys(this.props.cart)
		for (var i in keys){

		}
		// this.props.loader.get('/products')
		// .then((data) => {
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
				{this.props.cart.map((item, i) => {
					return (
						<div className="col-lg-12" key={i}>
							<CartItem
								index={i}
								{...item.product}
								quantity={item.quantity}/>
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
	cart: state.cart.items
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  addItem,
  setProducts
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)