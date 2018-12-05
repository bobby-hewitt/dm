import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import draftToHtml from 'draftjs-to-html';
import { EditorState,convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Form, {TextEditor, TextInput, ImageUpload} from 'components/Form'
import { onFieldChange, setProduct } from 'actions/product'

class EditProduct extends Component {

	constructor(props){
		super(props)
		this.state = {
			pageIsLoaded:false
		}
	}

	onSubmit(form){
		let isPut = window.location.search
		let action = isPut ? 'put' : 'post'
		let path = isPut ? '/admin/product/' + this.props.product._id : '/admin/product' 
		
		this.props.loader[action](path, form)
		.then((products) => {
			this.props.push('/admin/product')
		})
		.catch((err) => {
			console.log(err)
		})
	}

	componentWillMount(){
		if (this.props.isEdit){
			this.props.loader.get('/product/' + window.location.search.replace('?', ''))
			.then((data) => {
				this.props.setProduct(data[0], () => {
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
		this.props.setProduct({})
	}

	render(){
		console.log(this.props.product)
		return(
			<div className="Admin">

				{this.state.pageIsLoaded &&
					<Form 
						formId="Post"
						onSubmit={this.onSubmit.bind(this)}
						submitText="Submit"
						secondaryAction={this.props.push.bind(this, '/admin/product')}
						secondaryText="Cancel"
					>	
						<ImageUpload name="imageUpload" value={this.props.product.image} name="image"/>
						{this.props.isEdit &&
							<TextInput name="_id" value={this.props.product._id} type="hidden"/>	
						}
						<TextInput name="title" value={this.props.product.title} type="email"  onChange={this.onChange.bind(this)} placeholder="Title"/>
						<TextEditor name="body" value={this.props.product.body} onChange={this.onChange.bind(this)}/>	
						<TextInput name="price" value={this.props.product.price} type="number"  onChange={this.onChange.bind(this)} placeholder="Title"/>
					</Form>
				}
			</div>
		)
	}
}


const mapStateToProps = state => ({
	router: state.router,
	loader: state.setup.loader,
	product: state.product.product
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  onFieldChange,
  setProduct
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProduct)