import React, { Component } from 'react'
import './style.scss'
import Form, {TextInput, FindAddress} from 'components/Form'

export default class Register extends Component {

	constructor(props){
		super(props)
		this.state = {
			addressError: false,
			emailError: false,
			passwordError: false
		}
	}

	onSubmit(form){
		if (form.password !== form.confirmPassword){
			this.setState({passwordError: true})
		} else if (!form.email) {
			this.setState({emailError: true})
		} else {
			//handle submit form
			this.setState({passwordError: false, emailError: false})
		}
	}
	render(){
		return(
			<div>
				<Form 
					formId="register"
					onSubmit={this.onSubmit.bind(this)}
				>
					<FindAddress />
					<TextInput name="email" type="email" fieldError={this.state.emailError} placeholder="email"/>
					<TextInput name="username" type="username" fieldError={this.state.usernameError} placeholder="username" helpText="This is the same for all users"/>
					<TextInput name="password" type="password" label={this.state.passwordError ? 'please enter matching passwords' : null}fieldError={this.state.passwordError} placeholder="password"/>
					<TextInput name="confirmPassword" type="password" fieldError={this.state.passwordError} placeholder="password"/>
				</Form>

			</div>
		)
	}
}