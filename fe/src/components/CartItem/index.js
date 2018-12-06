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

	componentWillReceiveProps(np){
		console.log(np.quantity)
	}

	onRemoveItem(id){
		this.props.decreaseQuantity(id)
	}

	onAddItem(id){
		this.props.increaseQuantity(id)
	}

	onDeleteFromCart(id){
		console.log('deleting item', id)
	}

	render(){
		return(
			<div className="cartItem row">
				<div className="col-md-6 col-sm-12">
					<div className="cartItemMeta">
						<div className="cartImage" style={{backgroundImage: 'url(http://ew.content.allrecipes.com/sites/default/files/2018-07/herb-mixes-001_960px.jpg)'}}>
							<div className="dummy">
							</div>
						</div>
						{this.props.title}
					</div>
				</div>
				<div className="col-md-6 col-sm-12">
					<div className="cartItemController">
						<ActionIcon action={this.onRemoveItem.bind(this, this.props._id)}/>
						<p>{this.props.quantity}</p>
						<ActionIcon action={this.onAddItem.bind(this, this.props._id)}/>
						<ActionIcon secondary action={this.onDeleteFromCart.bind(this, this.props._id)}/>
					</div>
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