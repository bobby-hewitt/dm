import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'


class MouseHandlerComponentWrapper extends Component {

	constructor(props){
		super(props)
		this.state = {
			clicked: false
		}
	}

	onMouseMove(e){
		this.props.mouseHandler.onMouseMove(e)
		if (this.props.onMouseMove) this.props.onMouseMove(this.state.clicked)
	}

	onMouseDown(e){
		this.setState({clicked: true}, () => {
			this.props.mouseHandler.onMouseDown(e)
			if (this.props.onMouseDown) this.props.onMouseDown()
		})
		

	}
	onMouseUp(e){
		this.setState({clicked: false}, () => {
			this.props.mouseHandler.onMouseUp(e)
			if (this.props.onMouseUp) this.props.onMouseUp()
		})
		
	}

	render(){
		return(
			<div 
				onMouseMove={this.onMouseMove.bind(this)} 
				onMouseDown={this.onMouseDown.bind(this)} 
				onMouseUp={this.onMouseUp.bind(this)}
				onMouseOut={this.onMouseUp.bind(this)}
				onTouchOut={this.onMouseUp.bind(this)}
				onTouchMove={this.onMouseMove.bind(this)} 
				onTouchStart={this.onMouseDown.bind(this)} 
				onTouchEnd={this.onMouseUp.bind(this)}>
				{this.props.children}
			</div>
			
		)
	}
}

const mapStateToProps = state => ({
	mouseHandler: state.setup.mouseHandler
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MouseHandlerComponentWrapper)