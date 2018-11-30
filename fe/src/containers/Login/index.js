import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, {TextInput, FindAddress} from 'components/Form'
import { post, get, del,  } from 'helpers/request'
import { setUser } from 'actions/user'

class Login extends Component {

	constructor(props){
		super(props)
		this.state = {
			addressError: false,
			emailError: false,
			passwordError: false
		}
	}
	componentWillMount(){
		del('/users/')
		.then((data) => {
			console.log(data)
		})
	}
	onSubmit(form){
		
			//handle submit form
			post('/users/login', form)
			.then((data) => {
				this.props.setUser(data)
				this.props.push('/test')
			})
			.catch((err) => {
				console.log(err)
			})
			this.setState({passwordError: false, emailError: false})
		
	}
	render(){
		return(
			<div>
				<Form 
					formId="Login"
					onSubmit={this.onSubmit.bind(this)}
				>
					<TextInput name="username" type="email" fieldError={this.state.emailError} placeholder="email"/>
					<TextInput name="password" type="password" label={this.state.passwordError ? 'please enter matching passwords' : null}fieldError={this.state.passwordError} placeholder="password"/>
		
				</Form>

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
)(Login)