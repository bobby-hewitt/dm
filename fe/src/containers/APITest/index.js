import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, {TextInput, FindAddress} from 'components/Form'
import { post, get, del,  } from 'helpers/request'
import { setUser } from 'actions/user'

class Register extends Component {

	constructor(props){
		super(props)
		this.state = {
			addressError: false,
			emailError: false,
			passwordError: false
		}
	}
	componentWillMount(){	
		
		
		get('/api/5c01306968ffe37a8472d479')
		.then((data) => {
			console.log('wohooo')
		}).catch((err)=> {
			console.log('urgh')
		})
	}
	
	render(){
		return(
			<div>
				Hi
			</div>
		)
	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setUser
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)