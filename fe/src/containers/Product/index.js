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

class ItemPage extends Component {
	
	componentWillMount(){
		console.log('location', this.props.router.location.pathname.split('/')[2])
		const id = this.props.router.location.pathname.split('/')[2]
		this.props.loader.get('/product/' + id)
		.then((data) => {
			this.props.setProduct(data[0])
		})
		.catch((err)=> {
			console.log('err')
			console.log(err)
		})
	}

	addToCart(){
		this.props.addItem(this.props.product)
	}



	render(){
		let { title, price, body, image } = this.props.product
		return(
			<div className="container">
				{this.props.product &&
					<div>
					<div className="row">	
						<div className="offset-sm-1 col-sm-10 col-md-8 offset-md-2 col-xs-12">
							<div className="marginV">
							<h6>{title}</h6>
						</div>
						</div>
					</div>
					<div className="row">	
						<div className="offset-sm-1 col-sm-10 col-md-8 offset-md-2 col-xs-12">
							<div className="marginV">
							<div className="productImage" style={{backgroundImage: 'url('  + image + ')'}} >
							    <div className="dummy"></div>								
							</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="offset-sm-1 col-sm-10 col-md-8 offset-md-2 col-xs-12" >		
								
							<Button text="Add to cart" onClick={this.addToCart.bind(this)}/>
						</div>
					</div>
					<div className="row">
						<div className="marginV">	
							<div className="offset-sm-1 col-sm-10 col-md-8 offset-md-2 col-xs-12" dangerouslySetInnerHTML={{__html: body}}>		
							</div>
						</div>
					</div>
					</div>
				}
		
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loader: state.setup.loader,
	router: state.router,
	product: state.product.product
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  addItem,
  setProduct,
  setProducts
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPage)