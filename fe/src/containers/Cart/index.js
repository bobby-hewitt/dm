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
	render(){
		console.log('CART COUNT', this.props.cartCount)
		return(
			<div className="container">
			{this.props.cart.length > 0 &&
				<div>
				<div className="hideSM">
					<div className=" row ">
						<div className="col-sm-3 col-xs-12">
							
						</div>
						<div className="col-sm-3 col-xs-12">
							<p>Item</p>	
						</div>
						<div className="col-sm-3 col-xs-12">
							<p>Quantity</p>	
						</div>
						<div className="col-sm-1 col-xs-12" >
							<p>Price</p>	
						</div>
					</div>
				</div>
					{this.props.cart.map((item, i) => {
						return (
							<div key={i}>
								<CartItem
									cartCount={this.props.cartCount}
									index={i}
									{...item.product}
									quantity={item.quantity}/>
							</div>
						)
					})}
					<div className=" row ">
					<div className="col-sm-9 hideSM" >
					
					</div>
					<div className="col-sm-3">
					<p>£{this.props.total}</p>
					<div className="margin">
						
						<Button isRow text="Checkout" onClick={this.props.push.bind(this, '/checkout')}/>
						
					</div>
					</div>
					</div>
					
				</div>
				}
				{this.props.cart.length <= 0 && 
					
					<div className="info">

						<p>Add some items to your cart before you check out</p>
						<Button isRow text="Shop now" onClick={this.props.push.bind(this, '/')}/>
					</div>
				
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loader: state.setup.loader,
	cart: state.cart.items,
	total: state.cart.total,
	cartCount: state.cart.count
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