import React, { Component } from 'react'
import './style.scss'

export default class ActionIcon extends Component {

	onClick(){
		if (this.props.action) this.props.action()
	}

	render(){
		return(
			<div className={`actionIconContainer ${this.props.secondary && 'secondary'}`} onClick={this.onClick.bind(this)}>

			</div>

		)
	}
}