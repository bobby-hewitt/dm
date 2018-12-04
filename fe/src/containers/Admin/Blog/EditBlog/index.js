import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import draftToHtml from 'draftjs-to-html';
import { EditorState,convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Form, {TextEditor, TextInput} from 'components/Form'
import { onFieldChange, setBlog } from 'actions/blog'

class Admin extends Component {

	constructor(props){
		super(props)
		this.state = {
			pageIsLoaded:false
		}
	}

	onSubmit(form){
		let isPut = window.location.search
		let action = isPut ? 'put' : 'post'
		let path = isPut ? '/admin/blog/' + this.props.blog._id : '/admin/blog' 
		
		this.props.loader[action](path, form)
		.then((blogs) => {
			this.props.push('/admin/blog')
		})
		.catch((err) => {
			console.log(err)
		})
	}

	componentWillMount(){
		if (this.props.isEdit){
			this.props.loader.get('/blog/' + window.location.search.replace('?', ''))
			.then((data) => {
				this.props.setBlog(data[0], () => {
					this.setState({pageIsLoaded: true})
				})
			})
			.catch((err) => {
				console.log(err)
			})
		} else {
			this.setState({pageIsLoaded: true})
		}
	}

	onChange(e){
		console.log(e.target.name, e.target.value)
		this.props.onFieldChange({
			field: e.target.name,
			value: e.target.value
		})
	}

	componentWillUnmount(){
		this.props.setBlog({})
	}

	render(){
		return(
			<div className="Admin">
				{this.state.pageIsLoaded &&
					<Form 
						formId="Post"
						onSubmit={this.onSubmit.bind(this)}
						submitText="Submit"
						secondaryAction={this.props.push.bind(this, '/admin/blog')}
						secondaryText="Cancel"
					>	
						{this.props.isEdit &&
						<TextInput name="_id" value={this.props.blog._id} type="hidden"/>	
						}
						<TextInput name="title" value={this.props.blog.title} type="email"  onChange={this.onChange.bind(this)} placeholder="Title"/>
						<TextEditor name="body" value={this.props.blog.body} onChange={this.onChange.bind(this)}/>	
					</Form>
				}
			</div>
		)
	}
}


const mapStateToProps = state => ({
	router: state.router,
	loader: state.setup.loader,
	blog: state.blog.blog
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  onFieldChange,
  setBlog
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)