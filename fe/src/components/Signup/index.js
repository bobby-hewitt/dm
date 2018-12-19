import React, { Component } from 'react'
import './style.scss'
import Form, { TextInput } from 'components/Form'

export default class Signup extends Component {

	onSubmit(data){
		console.log('signup', data)
	}
	render(){
		return(
			<div className="signUpBackground" style={{backgroundImage: 'url(' + require('assets/images/spices.jpeg')+ ')'}}>
			<div className="overlay">
			
			<div className="signupContainer" >
			
				<div className="signupForm">
				<h4 className="overlayedTitle">Stay up to date with our hottest offers</h4>
				<Form 
					formId="Signup"
					onSubmit={this.onSubmit.bind(this)}
					submitText="Stay in touch"
				>
					<TextInput name="Email" type="email" placeholder="email"/>
					
				</Form>
				</div>
			</div>
			</div>
			</div>
		)
	}
}