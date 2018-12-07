import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, { TextInput } from 'components/Form'
import Button from 'components/Button'
import Item from 'components/Item'


import { addItem, increaseQuantity, decreaseQuantity, deleteItem} from 'actions/cart'
import ActionIcon from 'components/ActionIcon'

import './style.scss'

class Cart extends Component {

	

	onIncreaseQuantity(id){
		console.log('incease ')
		this.props.increaseQuantity(id)
	}

	onDecreaseQuantity(id){
		console.log(this.props.quantity, 'here')
		if (this.props.quantity == 1){
			console.log('here')
			this.props.deleteItem(id)	
		} else {
			this.props.decreaseQuantity(id)
			
		}
		
	}

	onDeleteFromCart(id){
		this.props.deleteItem(id)
	}

	render(){
		return(
			<div className="cartItem row">
				<div className="col-sm-2 col-md-3 col-xs-12 hideXS">
					<div className="cartItemMeta">
						<div className="cartImage" style={{backgroundImage: 'url(' + this.props.image + ')'}}>
							<div className="dummy">
							</div>
						</div>
						
					</div>
				</div>
				<div className="col-sm-3 col-md-3 col-xs-12">
					<p className="marginV">{this.props.title}</p>
				</div>
				<div className="col-sm-4 col-md-3 col-xs-12">
					<div className="cartItemController">
							<ActionIcon text="-"disabled={this.props.quantity <= 0} action={this.onDecreaseQuantity.bind(this, this.props._id)}/>
							<p>{this.props.quantity}</p>
							<ActionIcon text="+"action={this.onIncreaseQuantity.bind(this, this.props._id)}/>
						
					</div>
				</div>
				<div className="col-sm-2 col-md-1 col-xs-12" >
					<p>£{this.props.price}</p>
				</div>
				<div className="deleteButton col-sm-1 col-md-2 col-xs-12" onClick={this.onDeleteFromCart.bind(this, this.props._id)} >
						Remove 
					</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  addItem,
  increaseQuantity, 
  decreaseQuantity, 
  deleteItem
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)