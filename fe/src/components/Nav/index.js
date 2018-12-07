import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ActionIcon from 'components/ActionIcon'

const links = [
	{
		text: 'Shop',
		path: '/'
	},
	{
		text: 'Recipes',
		path: '/recipes'
	},
]

class Nav extends Component {

	constructor(props){
		super(props)
		this.state = {
			animated: false
		}
	}

	componentWillReceiveProps(np){
		if (np.cartCount !== this.props.cartCount){
			
			this.setState({animated: true}, ()=> {
				this.timeout = setTimeout(() => {
					this.setState({animated: false})
				},150)
			})
		}
	}

	componentWillUnmount(){
		clearTimeout(this.timeout)
	}



	render(){
		return(
			<div className="navContainer container-fluid">
				<div className="container">
				<h6 className="brand">London Spice Co.</h6>
				<div className="navRight">
					{links.map((link, i ) => {
						return(
							<div key={i}className="navLink" onClick={this.props.push.bind(this, link.path)}>
								{link.text}
							</div>
						)
					})}	
					<div className={`cart ${this.state.animated && 'animated'}`}>
						<ActionIcon size="30px"action={this.props.push.bind(this, '/cart')} />
					</div>
				</div>
			</div>
			
			</div>
			
		)
	}
}


const mapStateToProps = state => ({
	loader: state.setup.loader,
	cart: state.cart.items,
	cartCount: state.cart.count
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)