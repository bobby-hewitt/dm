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

class Checkout extends Component {

	


	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="col-xl-12">
						<form action="your-server-side-code" method="POST">
  <script
    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
    data-key="pk_test_ccPentsWBu6hT2GiLV3OZbOZ"
    data-amount="999"
    data-name="Demo Site"
    data-description="Widget"
    data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
    data-locale="auto"
    data-currency="gbp">
  </script>
</form>
					</div>
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
)(Checkout)