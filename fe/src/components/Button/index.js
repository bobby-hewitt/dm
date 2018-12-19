import React, { Component } from 'react'
import './style.scss'

export default class Button extends Component {
	render(){
		return(
			<div className={this.props.isRow ? "row" : ''}>
			<div className={`button ${this.props.disabled && 'disabled'}`} id={this.props.id} onClick={this.props.onClick.bind(this)}>
				<h6>{this.props.text}</h6>
			</div>
			</div>
		)
	}
}