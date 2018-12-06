import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router'
import Home from './containers/Home'
import Auth from 'containers/Auth'
import Admin from 'containers/Admin'
import Product from 'containers/Product'
import Nav from 'components/Nav'
import Loading from 'components/Loading'
import Cart from 'containers/Cart'
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
			    <main>
			    {this.props.loader &&
			      <div className="container">
			        <Route path="/auth" component={Auth} />
			        <Route exact path="/" component={Home} /> 
			        <Route exact path="/product/:id" component={Product} /> 
			        <Route path="/admin" component={Admin} /> 
			        <Route path="/cart" component={Cart} /> 
			      </div>
			  	}
			       <Loading ref="loader"/>
			       <MouseEffects
						onMount={this.onMouseHandlerMount.bind(this)}
						
					/>
			    </main>

			</div>
		)
	}
}
 

const mapStateToProps = state => ({
	loader: state.setup.loader
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setLoader,
	setMouseHandler,
}, dispatch)


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes))
