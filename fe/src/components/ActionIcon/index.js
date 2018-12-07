import React, { Component } from 'react'
import './style.scss'

export default class ActionIcon extends Component {

	onClick(){
		if (this.props.action) this.props.action()
	}

	render(){
		var cn = 'actionIconContainer'
		if (this.props.secondary) cn += ' secondary'
		if (this.props.disabled) cn += ' disabled'
		return(
			<div className={cn} style={{width: this.props.size, height:this.props.size}}onClick={this.onClick.bind(this)}>
				<h6>{this.props.text}</h6>
			</div>

		)
	}
}