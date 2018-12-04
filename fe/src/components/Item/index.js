import React, { Component } from 'react'
import './style.scss'
import Button from 'components/Button'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setBlog } from 'actions/blog'

class Item extends Component {

	edit(){
		this.props.onEdit(this.props._id)
	}

	delete(){
		let route = '/admin/' + this.props.type + '/' + this.props._id
		this.props.loader.del(route)
		.then((data) => {
			this.props.onDelete(data)
		})
		.catch((err) => {
			console.log(err)
		})
	}

	render(){
		return(
			<div className="itemContainer">
				<h5>{this.props.title}</h5>
				<div className="buttonContainer">
				<Button text="Edit" onClick={this.edit.bind(this)}/>
				<Button text="Delete" onClick={this.delete.bind(this)}/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loader: state.setup.loader,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setBlog,
  push: (path) => push(path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)