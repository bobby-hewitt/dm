import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router'
import Home from './containers/Home'
import Auth from 'containers/Auth'
import Admin from 'containers/Admin'
import Product from 'containers/Product'
import Nav from 'components/Nav'
import Loading from 'components/Loading'
import Cart from 'containers/Cart'
import Checkout from 'containers/Checkout'
import { setLoader, setMouseHandler } from 'actions/setup'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MouseEffects from 'containers/ClickEffect/MouseEffects'

class Routes extends Component {

	componentDidMount(){
		this.props.setLoader(this.refs.loader)
	}
	onMouseHandlerMount(mouseHandler){
		this.props.setMouseHandler(mouseHandler)
	}


	render(){
		return(
			<div>
				<Nav />
				
			    <main >
			    <div className="siteBackground"style={{backgroundImage: 'url(' + require('assets/images/wall.jpeg') + ")"}}>
					<div className="whiteOverlay" />

				</div>
			    {this.props.loader &&
			      <div className="container" >
			        <Route path="/auth" component={Auth} />
			        <Route exact path="/" component={Home} /> 
			        <Route exact path="/product/:id" component={Product} /> 
			        <Route path="/admin" component={Admin} /> 
			        <Route path="/cart" component={Cart} /> 
			        <Route path="/checkout" component={Checkout} /> 

			      </div>
			  	}
				       <Loading router={this.props.router} ref="loader"/>
				       <MouseEffects
							onMount={this.onMouseHandlerMount.bind(this)}		
						/>
			    </main>

			</div>
		)
	}
}
 

const mapStateToProps = state => ({
	loader: state.setup.loader,
	router: state.router
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setLoader,
	setMouseHandler,
}, dispatch)


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes))
