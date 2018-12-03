import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router'
import Home from './containers/Home'
import Auth from 'containers/Auth'
import Loading from 'components/Loading'
import { setLoader } from 'actions/setup'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class Routes extends Component {

	componentDidMount(){
		console.log(this.refs.loader)
		this.props.setLoader(this.refs.loader)
	}

	render(){
		return(
			<div>
			    <main>
			      <div className="container">
			        <Route path="/auth" component={Auth} />
			        <Route path="/home" component={Home} />
			        <Loading ref="loader"/>
			      </div>
			    </main>
			</div>
		)
	}
}
 

const mapStateToProps = state => ({
	
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setLoader
}, dispatch)


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes))
