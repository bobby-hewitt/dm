import React, { Component } from 'react'
import './style.scss'


export default class ImageSection extends Component {

	
	render(){
		const image= this.props.image || require('assets/images/spices.jpeg') 
		return(
			<div className="imageSection" style={{backgroundImage: 'url(' + image + ')'}}>
				<div className="overlay">
				
				
				<h4 className="overlayedTitle">{this.props.text}</h4>
					
				
				</div>
			</div>
		)
	}
}