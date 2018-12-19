import React, { Component } from 'react'
import './style.scss'

export default class TransaprentSection extends Component {
	render(){
		return(
			<div className="transparentSectionContainer">
				
				{this.props.children}
			</div>
		)
	}
}
