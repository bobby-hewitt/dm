import React, { Component } from 'react'
import './style.scss'
import MouseHandlerComponentWrapper from 'containers/ClickEffect/MouseHandlerComponentWrapper'


export default class ProductCard extends Component {

	constructor(props){
		super(props)
		this.state = {
			animated: false,
		}
	}

	onAddClick(e){
		e.stopPropagation()

		this.props.addToCart(this.props.product)
		this.setState({animated: true}, ()=> {
			this.timeout = setTimeout(() => {
				this.setState({animated: false})
			},150)
		})
	}	

	componentWillUnmount(){
		clearTimeout(this.timeout)
	}

	render(){
		const { title, price, body, _id } = this.props.product
		return(
			<div className="productContainer" onClick={this.props.onClick.bind(this, _id)}>	
				<div className="productImage" style={{backgroundImage: 'url(http://ew.content.allrecipes.com/sites/default/files/2018-07/herb-mixes-001_960px.jpg)'}} >
				    <div className="dummy"></div>
					
						<div className={`infoContainer ${this.state.animated && 'animated'}`} onClick={this.onAddClick.bind(this)}>
							<img src={require('../../assets/icons/plus.png')} />
						</div>
					
				</div>
				<div className="metaContainer">
					<h6>{title}</h6><p>$3.99</p>

				</div>	
			</div>
		)
	}
}


