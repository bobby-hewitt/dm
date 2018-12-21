import React, { Component } from 'react'
import './style.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setRecipes } from 'actions/recipe'
import { setBlogs } from 'actions/blog'
import { setProducts } from 'actions/product'
import Search from 'components/Search'
import ProductCard from 'components/ProductCard'

class ProductSelect extends Component {

	constructor(props){
		super(props)
		this.state = {
			focus: false,
			products: this.props.products ? this.props.products : [],
			productIds: this.props.productIds ? this.props.productIds : []
		}	
	}

	onFocus(){
		this.setState({focus: true})
	}
	onBlur(){
		// this.setState({focus: false})
	}
	onRemoveProduct(product, index){
		let newProducts = Object.assign([],this.state.products)
		let newIds = Object.assign([],this.state.productIds)
		newProducts.splice(index, 1)
		newIds.splice(index, 1)
		this.setState({
			products: newProducts,
			productIds: newIds
		}, () => {
			this.onChange()
		})
		
	}
	onAddProduct(product){
		console.log('adding, product', product)
		let newProducts = Object.assign([],this.state.products)
		let newIds = Object.assign([], this.state.productIds)
		newIds.push(product._id)
		newProducts.push(product)
		this.setState({
			products: newProducts,
			productIds: newIds
		}, () => {
			this.onChange()
		})
		console.log(this.state.productIds)
		this.setState({focus: false})
	}

	onChange(){
		let e = {
			target: {
				name: 'productIds',
				value: this.state.productIds
			}
		}
		this.props.onChange(e)
	}



	render(){

		return(
			<div className="productSelectContainer">

				<Search 
					type="products" 
					ref="search" 
					name="searchToDelete"
					onFocus={this.onFocus.bind(this)}
					onBlur={this.onBlur.bind(this)}
				/>
				{this.state.focus && 
					<div className="productSearchResultsContainer">
						{this.props.products.map((p, i) => {
							return(
								<div key={i} className="productSearchTitle" onClick={this.onAddProduct.bind(this,p)}>
									{p.title}
								</div>
							)
						})}
					</div>
				}
				<div className="productsContainer">
					<div className="rowOverflow">
						{this.state.productIds.map((p, i) => {
							console.log(p)
							return(
								<div className="productSearchCardContainer">
									{this.state.products[i] &&
										<ProductCard isMinus index={i} product={this.state.products[i]} action={this.onRemoveProduct.bind(this)} onClick={() => {return}}/>
									}
								</div>
							)
						})}
					</div>
				</div>
				<input name="productIds" type="hidden" value={JSON.stringify(this.state.productIds)} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loader: state.setup.loader,
	products: state.product.products
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setRecipes,
	setBlogs,
	setProducts
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSelect)
