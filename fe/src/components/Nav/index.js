import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ActionIcon from 'components/ActionIcon'

const links = [
	{
		text: 'Admin',
		path: '/admin'
	},
	{
		text: 'Shop',
		path: '/'
	},
	{
		text: 'Recipes',
		path: '/recipes'
	},
	{
		text: 'About',
		path: '/about'
	},
	{
		text:'Test',
		path:'about'
	}
]

const adminLinks = [
	{
		text: 'Products',
		path: '/admin/product'
	},
	{
		text: 'Blog',
		path: '/admin/blog'
	},
	{
		text: 'Recipe',
		path: '/admin/recipe'
	},
]

class Nav extends Component {

	constructor(props){
		super(props)
		
		this.state = {
			links: this.props.router.location.pathname.indexOf('/admin') > -1 ? adminLinks : links,
			animated: false
		}
	}

	componentWillReceiveProps(np){
		if (this.props.router.location.pathname !== np.router.location.pathname){
			this.setState({links: np.router.location.pathname.indexOf('/admin') > -1 ? adminLinks : links})
		}
		console.log(window.location.pathname)
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
					<h6 className="brand" onClick={this.props.push.bind(this,'/about')}>London Spice Co.</h6>
					<div className="navRight">
						{this.state.links.map((link, i ) => {
							return(
								<div key={i}className="navLink" onClick={this.props.push.bind(this, link.path)}>
									<h6>{link.text}</h6>
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
	router: state.router,
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