import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router'
import Home from './containers/Home'
import Auth from 'containers/Auth'
import Admin from 'containers/Admin'
import Loading from 'components/Loading'
import { setLoader } from 'actions/setup'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class Routes extends Component {

	componentDidMount(){
		this.props.setLoader(this.refs.loader)
	}

	render(){
		return(
			<div>
			    <main>
			    {this.props.loader &&
			      <div className="container">
			        <Route path="/auth" component={Auth} />
			        <Route path="/home" component={Home} /> 
			        <Route path="/admin" component={Admin} /> 
			      </div>
			  	}
			       <Loading ref="loader"/>
			    </main>

			</div>
		)
	}
}
 

const mapStateToProps = state => ({
	loader: state.setup.loader
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setLoader
}, dispatch)


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes))
