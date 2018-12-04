import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, { TextInput } from 'components/Form'
import Button from 'components/Button'
import Item from 'components/Item'
import { setProduct, setProducts } from 'actions/product'
import './style.scss'

class Products extends Component {

	addNew(){
		this.props.push('/admin/product/add')
	}

	onEdit(id){
		this.props.push('/admin/product/edit?' + id)
	}

	componentWillMount(){
		this.props.loader.get('/products')
		.then((data) => {
			this.props.setProducts(data)
		})
		.catch((err)=> {
			console.log(err)
		})
	}

	render(){
		return(
			<div className="product">	
				<Button text="Add new" onClick={this.addNew.bind(this)}/>
				{this.props.products.map((product, i) => {
					return (
						<Item 
							type="product"
							key={i} 
							{...product} 
							onEdit={this.onEdit.bind(this)}
							onDelete={this.props.setProducts.bind(this)}/>
					)
				})}
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
  setProduct,
  setProducts
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)